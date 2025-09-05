"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GENRE_CATEGORIES } from "@/lib/quiz-data"
import type { GenreKey } from "@/types/quiz"
import Link from "next/link"

export default function GenreSelectionPage() {
  const [selectedGenre, setSelectedGenre] = useState<GenreKey | null>(null)
  const router = useRouter()

  const handleStartQuiz = () => {
    if (selectedGenre) {
      localStorage.setItem("selectedGenre", selectedGenre)
      router.push("/quiz")
    }
  }

  // ★★★ 変更点：「おまかせ」の総数を計算するロジックをここに移動 ★★★
  const totalCraftsCount = Object.entries(GENRE_CATEGORIES).reduce((acc, [key, genre]) => {
    if (key !== 'all') {
      return acc + genre.crafts.length;
    }
    return acc;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-amber-50">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">ジャンル選択</h1>
            <Link href="/">
              <Button variant="outline" size="sm">
                ホームに戻る
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto"> 
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">挑戦したい工芸品のジャンルを選択してください</h2>
            <p className="text-muted-foreground">各ジャンルから15問（易5問・中5問・難5問）が出題されます</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {Object.entries(GENRE_CATEGORIES).map(([key, genre]) => {
                // 'all'カテゴリ以外のジャンルで、工芸品が0件の場合は表示しない
                if (key !== 'all' && genre.crafts.length === 0) {
                    return null;
                }

                const craftCount = key === 'all' ? totalCraftsCount : genre.crafts.length;
                const displayName = genre.name.split(" (")[0];

                return (
                    <Card
                        key={key}
                        // ★★★ 変更点：選択時の色を濃く修正 ★★★
                        className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                        selectedGenre === key ? "ring-2 ring-primary bg-primary/20" : "hover:bg-accent/50"
                        }`}
                        onClick={() => setSelectedGenre(key as GenreKey)}
                    >
                        <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-center">{displayName}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground text-center">{craftCount}種類の工芸品</p>
                        {key === "all" && <p className="text-xs text-primary text-center mt-1">全ジャンルからランダム出題</p>}
                        </CardContent>
                    </Card>
                )
            })}
          </div>
          <div className="text-center">
            <Button onClick={handleStartQuiz} disabled={!selectedGenre} size="lg" className="px-8 py-3 text-lg">
              {selectedGenre ? "クイズを開始する" : "ジャンルを選択してください"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

