"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MoodSelector } from "@/components/cocktail/MoodSelector";
import { QuickTags } from "@/components/cocktail/QuickTags";
import { CocktailCard } from "@/components/cocktail/CocktailCard";
import { RecipeDetail } from "@/components/cocktail/RecipeDetail";
import type { CocktailSuggestion } from "@/types/cocktail";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const supabase = createClient();
  const [suggestions, setSuggestions] = useState<CocktailSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCocktail, setSelectedCocktail] = useState<CocktailSuggestion | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleRecommend = async (mood: string, scene: string, inventory: string) => {
    setIsLoading(true);
    setError(null);
    setSuggestions([]);
    setHasSearched(true);

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
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        next.delete(cocktail.id);
        return next;
      });
    } else {
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
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            🍸 カクテルを提案
          </h1>
          <p className="text-muted-foreground">
            気分とシチュエーションを教えてください。AIが最適なカクテルを提案します。
          </p>
        </div>

        {/* Quick Tags */}
        <div className="bg-card rounded-xl p-4 border shadow-sm">
          <p className="text-sm font-medium text-muted-foreground mb-3">クイックモード</p>
          <QuickTags onSelect={handleQuickSelect} disabled={isLoading} />
        </div>

        {/* Mood Selector */}
        <MoodSelector onRecommend={handleRecommend} isLoading={isLoading} />

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm animate-fade-in-up">
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="flex items-center gap-3 text-amber-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-medium">AIがあなたにぴったりのカクテルを考えています...</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl border overflow-hidden animate-pulse">
                  <div className="h-48 bg-muted" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="flex gap-2">
                      <div className="h-6 bg-muted rounded w-20" />
                      <div className="h-6 bg-muted rounded w-20" />
                    </div>
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {!isLoading && suggestions.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                ✨ おすすめのカクテル
                <span className="text-sm font-normal text-muted-foreground">
                  （{suggestions.length}杯）
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map((cocktail, i) => (
                  <div
                    key={cocktail.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <CocktailCard
                      cocktail={cocktail}
                      onShowDetail={handleShowDetail}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorited={favoriteIds.has(cocktail.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Empty state */}
        {!isLoading && hasSearched && suggestions.length === 0 && !error && (
          <div className="text-center py-12 animate-fade-in-up">
            <div className="text-5xl mb-4">🤷</div>
            <p className="text-lg text-muted-foreground">
              提案が見つかりませんでした。別の気分やシチュエーションで試してみてください。
            </p>
          </div>
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