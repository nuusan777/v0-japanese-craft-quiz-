//app>results>page.tsx
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScoreChart } from "@/components/quiz/score-chart"
import { DonutChart } from "@/components/quiz/donut-chart"
import { CategoryBreakdown } from "@/components/quiz/category-breakdown"
import { ScoreSubmissionDialog } from "@/components/quiz/score-submission-dialog"
import type { QuizQuestion, KnowledgeCategory } from "@/types/quiz"
import { getRank, isTopScore } from "@/lib/leaderboard"
import Link from "next/link"
import { Trophy, RotateCcw, Award } from "lucide-react"

interface QuizResults {
  sessionId: string
  totalQuestions: number
  correctAnswers: number
  accuracy: number
  completionTime: number
  categoryBreakdown: Record<KnowledgeCategory, { correct: number; total: number }>
  questions: QuizQuestion[]
  answers: (string | null)[]
  startTime: string
  endTime: string
}

export default function ResultsPage() {
  const [results, setResults] = useState<QuizResults | null>(null)
  const [showSubmissionDialog, setShowSubmissionDialog] = useState(false)
  const [currentRank, setCurrentRank] = useState<number | null>(null)
  const [isNewTopScore, setIsNewTopScore] = useState(false)

  useEffect(() => {
    const storedResults = localStorage.getItem("quizResults")
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults)
      setResults(parsedResults)

      // Calculate rank and check if it's a top score
      const rank = getRank(parsedResults.accuracy, parsedResults.completionTime)
      const topScore = isTopScore(parsedResults.accuracy, parsedResults.completionTime)

      setCurrentRank(rank)
      setIsNewTopScore(topScore)

      // Show submission dialog for good scores (top 10 or accuracy >= 70%)
      if (rank <= 10 || parsedResults.accuracy >= 70) {
        setShowSubmissionDialog(true)
      }
    }
  }, [])

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p className="text-center">結果を読み込み中...</p>
            <div className="mt-4 text-center">
              <Link href="/">
                <Button variant="outline">クイズ選択に戻る</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getScoreGrade = (accuracy: number) => {
    if (accuracy >= 90) return { grade: "S", color: "text-yellow-600", bg: "bg-yellow-100" }
    if (accuracy >= 80) return { grade: "A", color: "text-green-600", bg: "bg-green-100" }
    if (accuracy >= 70) return { grade: "B", color: "text-blue-600", bg: "bg-blue-100" }
    if (accuracy >= 60) return { grade: "C", color: "text-orange-600", bg: "bg-orange-100" }
    return { grade: "D", color: "text-red-600", bg: "bg-red-100" }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}分${remainingSeconds}秒`
  }

  const scoreGrade = getScoreGrade(results.accuracy)

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <header className="w-full py-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-foreground text-center mb-2">クイズ結果</h1>
        <span className="text-sm text-muted-foreground text-center">あなたの推し理解度は…</span>
        <Link href="/" className="absolute top-6 right-6">
          <Button variant="outline" size="sm">ホーム</Button>
        </Link>
      </header>

      <main className="w-full flex flex-col items-center px-4">
        {/* 円形グラフ（正答率） */}
        <div className="flex flex-col items-center my-4">
          <DonutChart value={results.accuracy} size={256} color="#7ec6e7" bgColor="#eaf6fa" textColor="#222" />
        </div>

        {/* 分野別パフォーマンス（CategoryBreakdown）カード */}
        <div className="w-full flex justify-center mb-8">
          <CategoryBreakdown categoryBreakdown={results.categoryBreakdown} />
        </div>

        {/* ランク・ポイント */}
        <div className="flex justify-center items-center gap-8 my-6">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center mb-2 border-2 border-pink-300">
              <span className="text-4xl font-bold text-pink-600">{currentRank ?? 5}</span>
            </div>
            <span className="text-xs font-bold tracking-widest text-foreground">伝統品愛着度ランク</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-2 border-2 border-gray-300">
              <span className="text-4xl font-bold text-primary">{Math.round((results.correctAnswers / 15) * 100)}</span>
            </div>
            <span className="text-xs font-bold tracking-widest text-foreground">総獲得ポイント</span>
          </div>
        </div>

        {/* 説明文 */}
        <div className="bg-card rounded-lg p-4 text-center text-sm text-muted-foreground max-w-md mx-auto mb-6">
          あなたはこの伝統品について<br />
          <span className="font-bold text-lg text-primary">{Math.round(results.accuracy)}％理解していました。すばらしい！</span><br />
          愛着度ランクをどんどん上げて<br />
          抽選の当選率を高めよう！
        </div>

        {/* ボタン群 */}
        <div className="flex flex-col gap-2 w-full max-w-md mx-auto mb-8">
          <Link href="/quiz">
            <Button className="w-full">もう一度挑戦する</Button>
          </Link>
          <Link href="/leaderboard">
            <Button variant="secondary" className="w-full">ランキングを見る</Button>
          </Link>
          <Link href="/genre-selection">
            <Button variant="outline" className="w-full">他の伝統品のクイズを学ぶ</Button>
          </Link>
        </div>
      </main>

      {/* Score Submission Dialog（必要なら表示） */}
      <ScoreSubmissionDialog
        open={showSubmissionDialog}
        onOpenChange={setShowSubmissionDialog}
        results={results}
        currentRank={currentRank}
        isTopScore={isNewTopScore}
      />
    </div>
  )
}
