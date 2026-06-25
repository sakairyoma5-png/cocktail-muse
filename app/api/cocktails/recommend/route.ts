import { NextRequest, NextResponse } from "next/server";
import { getRecommendations } from "@/lib/ai/client";
import { searchImages } from "@/lib/unsplash/client";
import type { RecommendRequest, CocktailSuggestion } from "@/types/cocktail";

export async function POST(request: NextRequest) {
  try {
    const body: RecommendRequest = await request.json();

    if (!body.mood || !body.scene) {
      return NextResponse.json(
        { error: "Bad Request", message: "mood と scene は必須です" },
        { status: 400 }
      );
    }

    // DeepSeek API でカクテル提案を取得
    const recommendations = await getRecommendations(
      body.mood,
      body.scene,
      body.inventory
    );

    // 各カクテルに Unsplash 画像を付与
    const suggestionsWithImages: CocktailSuggestion[] = await Promise.all(
      recommendations.suggestions.map(async (cocktail) => {
        try {
          const images = await searchImages(cocktail.searchKeyword);
          return { ...cocktail, images };
        } catch {
          return { ...cocktail, images: [] };
        }
      })
    );

    return NextResponse.json({ suggestions: suggestionsWithImages });
  } catch (error) {
    console.error("Recommend API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "提案の生成に失敗しました" },
      { status: 500 }
    );
  }
}