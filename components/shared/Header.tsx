"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }: { data: { user: any } }) => {
      setUser(data.user);
    });
  }, [supabase]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent hover:from-amber-500 hover:to-orange-500 transition-all"
        >
          🍸 Cocktail Muse
        </Link>
        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-sm hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                >
                  提案
                </Button>
              </Link>
              <Link href="/mypage">
                <Button
                  variant="ghost"
                  className="text-sm hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                >
                  お気に入り
                </Button>
              </Link>
              <div className="flex items-center gap-2 ml-2 pl-2 border-l">
                <Avatar className="h-8 w-8 ring-2 ring-amber-200 dark:ring-amber-800">
                  <AvatarFallback className="text-xs bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-xs border-muted-foreground/30"
                >
                  ログアウト
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-sm hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                >
                  ログイン
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  className="text-sm bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-md"
                >
                  サインアップ
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}