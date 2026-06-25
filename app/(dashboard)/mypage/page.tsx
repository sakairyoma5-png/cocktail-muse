"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { CocktailCard } from "@/components/cocktail/CocktailCard";
import { RecipeDetail } from "@/components/cocktail/RecipeDetail";
import type { CocktailSuggestion, FavoriteCocktail } from "@/types/cocktail";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function MyPage() {
  const router = useRouter();
  const supabase = createClient();
  const [favorites, setFavorites] = useState<(FavoriteCocktail & { recipe: CocktailSuggestion })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCocktail, setSelectedCocktail] = useState<CocktailSuggestion | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const response = await fetch("/api/cocktails/favorites");
      if (!response.ok) throw new Error("取得に失敗しました");

      const data = await response.json();
      setFavorites(data.favorites || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (id: string) => {
    try {
      const response = await fetch(`/api/cocktails/favorites?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFavorites((prev) => prev.filter((f) => f.id !== id));
      }
    } catch {
      // ignore
    }
  };

  const handleShowDetail = (cocktail: CocktailSuggestion) => {
    setSelectedCocktail(cocktail);
    setDetailOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">❤️ お気に入り</h1>
          <p className="text-muted-foreground">
            保存したカクテルレシピの一覧です。
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              まだお気に入りがありません
            </p>
            <Button onClick={() => router.push("/dashboard")}>
              カクテルを探す
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav) => (
              <div key={fav.id} className="relative">
                <CocktailCard
                  cocktail={fav.recipe}
                  onShowDetail={handleShowDetail}
                  onToggleFavorite={() => handleRemoveFavorite(fav.id)}
                  isFavorited={true}
                />
              </div>
            ))}
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