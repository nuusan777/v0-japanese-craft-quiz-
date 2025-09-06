import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Trophy, Sparkles, BookOpen, Target } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <h1 className="text-3xl font-bold text-foreground mb-1 animate-fade-in">日本伝統工芸品クイズ</h1>
              <p className="text-muted-foreground text-sm animate-fade-in-delay">Japanese Traditional Crafts Quiz</p>
            </div>
            <Link href="https://homepage-kappa-lemon.vercel.app/">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary/20 transition-all duration-200 hover:scale-105 bg-transparent"
              >
                
                ホーム
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary/20 transition-all duration-200 hover:scale-105 bg-transparent"
              >
                <Trophy className="w-4 h-4" />
                ランキング
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl opacity-30 animate-pulse-slow"></div>
              <h2 className="relative text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance leading-tight">
                日本の美しい伝統工芸品について
                <span className="text-primary">学ぼう</span>
              </h2>
            </div>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
              陶器から織物まで、日本の豊かな工芸の歴史と技術を15問のクイズで探求しましょう
            </p>
            {/* ★★★ 変更点：「ランキングを見る」ボタンを削除し、「クイズを始める」を中央に ★★★ */}
            <div className="flex justify-center items-center">
              <Link href="/genre-selection">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl bg-gradient-to-r from-primary to-primary/90"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  クイズを始める
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* ★★★ 変更点：「52種類」を「243品目」に修正 ★★★ */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary/20 hover:border-l-primary">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <CardTitle className="text-primary group-hover:text-primary/80 transition-colors">
                    243品目の工芸品
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  陶器、織物、漆器、金工など、日本全国の伝統工芸品を網羅
                </CardDescription>
              </CardContent>
            </Card>

            {/* ★★★ 変更点：中央のカードのスタイルを左右のカードと統一 ★★★ */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary/20 hover:border-l-primary">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  <CardTitle className="text-primary group-hover:text-primary/80 transition-colors">
                    6つの知識分野
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  歴史、地理、材料、用途、デザイン、豆知識まで幅広く学習
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary/20 hover:border-l-primary">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <CardTitle className="text-primary group-hover:text-primary/80 transition-colors">
                    多様な出題形式
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  四択問題と○×問題で、飽きずに知識を試せます
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Quiz Info (変更なし) */}
          <Card className="mb-12 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-3 h-3 text-primary" />
                </div>
                クイズについて
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    出題内容
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <span className="w-1 h-1 rounded-full bg-primary/60"></span>
                      歴史・人物
                    </li>
                    <li className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <span className="w-1 h-1 rounded-full bg-primary/60"></span>
                      地理・産地
                    </li>
                    <li className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <span className="w-1 h-1 rounded-full bg-primary/60"></span>
                      材料・技法
                    </li>
                    <li className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <span className="w-1 h-1 rounded-full bg-primary/60"></span>
                      用途・文化背景
                    </li>
                    <li className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <span className="w-1 h-1 rounded-full bg-primary/60"></span>
                      意匠・デザイン
                    </li>
                    <li className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <span className="w-1 h-1 rounded-full bg-primary/60"></span>
                      豆知識・現代との関わり
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-accent flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    難易度
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <span className="w-1 h-1 rounded-full bg-green-500"></span>
                      初級: 5問
                    </li>
                    <li className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <span className="w-1 h-1 rounded-full bg-yellow-500"></span>
                      中級: 5問
                    </li>
                    <li className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <span className="w-1 h-1 rounded-full bg-red-500"></span>
                      上級: 5問
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
