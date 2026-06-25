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

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }: { data: { user: any } }) => {
      setUser(data.user);
    });
  }, [supabase]);

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          🍸 Cocktail Muse
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost">提案</Button>
              </Link>
              <Link href="/mypage">
                <Button variant="ghost">お気に入り</Button>
              </Link>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  ログアウト
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">ログイン</Button>
              </Link>
              <Link href="/signup">
                <Button>サインアップ</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}