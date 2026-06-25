import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "ログインが必要です" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ favorites: data });
  } catch (error) {
    console.error("Favorites GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "お気に入りの取得に失敗しました" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "ログインが必要です" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { cocktailName, recipe } = body;

    if (!cocktailName || !recipe) {
      return NextResponse.json(
        { error: "Bad Request", message: "cocktailName と recipe は必須です" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("favorites")
      .insert({
        user_id: user.id,
        cocktail_name: cocktailName,
        recipe,
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Conflict", message: "このカクテルは既にお気に入りに登録されています" },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json({ favorite: data }, { status: 201 });
  } catch (error) {
    console.error("Favorites POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "お気に入りの保存に失敗しました" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "ログインが必要です" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Bad Request", message: "id は必須です" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw error;

    return NextResponse.json({ message: "削除しました" });
  } catch (error) {
    console.error("Favorites DELETE error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "お気に入りの削除に失敗しました" },
      { status: 500 }
    );
  }
}