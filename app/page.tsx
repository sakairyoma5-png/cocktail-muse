import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 text-center">
      <div className="max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            🍸 Cocktail Muse
          </h1>
          <p className="text-xl text-muted-foreground">
            Cocktails for your mood, your moment, your muse.
          </p>
        </div>

        <p className="text-lg max-w-lg mx-auto text-muted-foreground">
          気分・シチュエーション・在庫から AI が最適なカクテルを提案。
          <br />
          レシピ・歴史・演出・音楽・撮影アドバイスまでワンセットで。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8">
              始める 🎉
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="text-lg px-8">
              ログイン
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl mb-2">🤔</div>
            <h3 className="font-semibold mb-1">気分を伝える</h3>
            <p className="text-sm text-muted-foreground">
              「疲れた」「お祝い」「デート」など、今の気分を入力
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="font-semibold mb-1">AIが提案</h3>
            <p className="text-sm text-muted-foreground">
              DeepSeek AIが最適な3杯のカクテルをセレクト
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl mb-2">✨</div>
            <h3 className="font-semibold mb-1">映える体験</h3>
            <p className="text-sm text-muted-foreground">
              レシピ・音楽・撮影アドバイスまで全て揃う
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}