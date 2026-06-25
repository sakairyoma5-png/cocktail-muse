import { NextRequest, NextResponse } from "next/server";
import { searchImages } from "@/lib/unsplash/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("keyword");
    const perPage = parseInt(searchParams.get("per_page") || "3");

    if (!keyword) {
      return NextResponse.json(
        { error: "Bad Request", message: "keyword は必須です" },
        { status: 400 }
      );
    }

    const images = await searchImages(keyword, perPage);
    return NextResponse.json({ images });
  } catch (error) {
    console.error("Unsplash search API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "画像の検索に失敗しました" },
      { status: 500 }
    );
  }
}