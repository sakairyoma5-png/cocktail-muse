import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900" />
        
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-3xl" />

        {/* Floating cocktail icons */}
        <div className="absolute top-32 left-[15%] text-6xl animate-float opacity-20">🍸</div>
        <div className="absolute top-48 right-[20%] text-4xl animate-float opacity-15" style={{ animationDelay: "1s" }}>🍹</div>
        <div className="absolute bottom-40 left-[25%] text-5xl animate-float opacity-20" style={{ animationDelay: "2s" }}>🥂</div>
        <div className="absolute bottom-32 right-[15%] text-4xl animate-float opacity-15" style={{ animationDelay: "0.5s" }}>🍷</div>

        {/* Sparkle dots */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-amber-300 rounded-full animate-ping" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-amber-200 rounded-full animate-ping" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-amber-300 rounded-full animate-ping" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-amber-200 rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="animate-fade-in-up">
            <div className="text-7xl mb-6">🍸</div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              Cocktail Muse
            </h1>
            <p className="text-xl md:text-2xl text-amber-200/80 mb-8 font-light">
              Cocktails for your mood, your moment, your muse.
            </p>
            <p className="text-lg text-white/60 mb-10 max-w-lg mx-auto leading-relaxed">
              気分・シチュエーション・在庫から AI が最適なカクテルを提案。
              <br />
              レシピ・歴史・演出・音楽・撮影アドバイスまでワンセットで。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="text-lg px-10 py-6 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold shadow-lg shadow-amber-500/25"
                >
                  始める 🎉
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-6 border-amber-700 text-amber-200 hover:bg-amber-950/50"
                >
                  ログイン
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How it works</h2>
            <p className="text-muted-foreground text-lg">
              3ステップで理想のカクテルに出会う
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative p-8 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-amber-200/50 transition-all duration-300">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-lg font-bold text-amber-700 dark:text-amber-300 shadow-md">
                1
              </div>
              <div className="text-4xl mb-4 mt-2">🤔</div>
              <h3 className="text-xl font-semibold mb-2">気分を伝える</h3>
              <p className="text-muted-foreground">
                「疲れた」「お祝い」「デート」など、今の気分を入力するだけ
              </p>
            </div>

            <div className="group relative p-8 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-amber-200/50 transition-all duration-300 delay-100">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-lg font-bold text-amber-700 dark:text-amber-300 shadow-md">
                2
              </div>
              <div className="text-4xl mb-4 mt-2">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AIがセレクト</h3>
              <p className="text-muted-foreground">
                DeepSeek AIがあなたに最適な3杯のカクテルを厳選提案
              </p>
            </div>

            <div className="group relative p-8 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-amber-200/50 transition-all duration-300 delay-200">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-lg font-bold text-amber-700 dark:text-amber-300 shadow-md">
                3
              </div>
              <div className="text-4xl mb-4 mt-2">✨</div>
              <h3 className="text-xl font-semibold mb-2">映える体験</h3>
              <p className="text-muted-foreground">
                レシピ・音楽・撮影アドバイスまで、全て揃えてお届け
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-amber-950/30 via-stone-900/30 to-amber-900/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            今夜、何飲む？
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            気分に合った一杯が見つかる。Cocktail Muse を始めてみませんか。
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="text-lg px-10 py-6 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold shadow-lg shadow-amber-500/25"
            >
              無料で始める 🥂
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}