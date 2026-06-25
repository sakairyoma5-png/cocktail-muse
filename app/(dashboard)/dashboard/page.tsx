"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MoodSelector } from "@/components/cocktail/MoodSelector";
import { QuickTags } from "@/components/cocktail/QuickTags";
import { CocktailCard } from "@/components/cocktail/CocktailCard";
import { RecipeDetail } from "@/components/cocktail/RecipeDetail";
import type { CocktailSuggestion } from "@/types/cocktail";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  const supabase = createClient();
  const [suggestions, setSuggestions] = useState<CocktailSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCocktail, setSelectedCocktail] = useState<CocktailSuggestion | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const handleRecommend = async (mood: string, scene: string, inventory: string) => {
    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const inventoryList = inventory
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const response = await fetch("/api/cocktails/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood,
          scene,
          inventory: inventoryList.length > 0 ? inventoryList : undefined,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "提案の取得に失敗しました");
      }

      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "予期せぬエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSelect = (mood: string, scene: string) => {
    handleRecommend(mood, scene, "");
  };

  const handleShowDetail = (cocktail: CocktailSuggestion) => {
    setSelectedCocktail(cocktail);
    setDetailOpen(true);
  };

  const handleToggleFavorite = async (cocktail: CocktailSuggestion) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (favoriteIds.has(cocktail.id)) {
      // Remove favorite
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        next.delete(cocktail.id);
        return next;
      });
    } else {
      // Add favorite
      try {
        const response = await fetch("/api/cocktails/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cocktailName: cocktail.name,
            recipe: cocktail,
          }),
        });

        if (response.ok) {
          setFavoriteIds((prev) => new Set(prev).add(cocktail.id));
        }
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">🍸 カクテルを提案</h1>
          <p className="text-muted-foreground">
            気分とシチュエーションを教えてください。AIが最適なカクテルを提案します。
          </p>
        </div>

        <QuickTags onSelect={handleQuickSelect} disabled={isLoading} />

        <MoodSelector onRecommend={handleRecommend} isLoading={isLoading} />

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {suggestions.length > 0 && (
          <>
            <Separator />
            <div>
              <h2 className="text-xl font-semibold mb-4">✨ おすすめのカクテル</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map((cocktail) => (
                  <CocktailCard
                    key={cocktail.id}
                    cocktail={cocktail}
                    onShowDetail={handleShowDetail}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorited={favoriteIds.has(cocktail.id)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <RecipeDetail
        cocktail={selectedCocktail}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  );
}