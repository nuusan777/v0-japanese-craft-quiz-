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
import { HeartRankCircle } from "@/components/ui/HeartRankCircle";
import { PointCircle } from "@/components/ui/PointCircle";
import { HomeIcon } from "@/components/ui/HomeIcon";

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
  <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: '#f8f6e3' }}>
      <header className="w-full py-6 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-foreground text-center mb-2 tracking-widest">クイズ結果</h1>
        <span className="text-1xl text-muted-foreground text-center">あなたの推し理解度は…</span>
      </header>

      <main className="w-full flex flex-col items-center px-4">
        {/* 円形グラフ（正答率） */}
        <div className="flex flex-col items-center my-4">
          <DonutChart value={results.accuracy} size={320} color="#7ec6e7" bgColor="#eaf6fa" textColor="#222" />
        </div>


        {/* ランク・ポイント */}
        <div className="flex justify-center items-center gap-8 my-6">
          <HeartRankCircle rank={Math.max(1, Math.min(10, Math.round(results.accuracy / 10)))} label="伝統品愛着度ランク" />
                <PointCircle point={Math.round((results.correctAnswers / 15) * 100)} />
        </div>

        {/* 説明文 */}
        <div className="bg-card rounded-lg p-4 text-center text-sm text-muted-foreground max-w-md mx-auto mb-6">
            <div className="text-center text-[1.1rem] tracking-widest leading-relaxed font-medium text-[#7c5a56] max-w-xl mx-auto" style={{ letterSpacing: '0.15em', backgroundColor: '#eaf6fa', borderRadius: '0.5rem', padding: '0.5rem 0' }}>
              <span style={{ color: '#222', letterSpacing: '0.3em' }}>
                あなたはこの伝統品について<br />
                {Math.round(results.accuracy)}％理解していました。すばらしい！<br />
                愛着度ランクをどんどん上げて<br />
                抽選の当選率を高めよう！
              </span>
            </div>
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
            <Button variant="outline" className="w-full">他の伝統品のクイズをする</Button>
          </Link>
          <Link href="https://v0-japanese-craft-quiz-2ch6.vercel.app/reviews">
            <Button variant="outline" className="w-full">クチコミを見る</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 mt-2">
              <HomeIcon />
              スタート画面
            </Button>
          </Link>
        </div>
        {/* クイズ結果拡散ボタン */}
        <div className="w-full max-w-md mx-auto flex justify-center gap-4 mb-10">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('私の伝統品クイズ結果！あなたも挑戦してみて！ #伝統品クイズ')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[#1da1f2] text-white font-bold shadow hover:bg-[#1877f2] transition"
          >Xで拡散</a>
          <a
            href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent('https://your-quiz-url.com')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[#00c300] text-white font-bold shadow hover:bg-[#009900] transition"
          >LINEで拡散</a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://your-quiz-url.com')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[#4267B2] text-white font-bold shadow hover:bg-[#29487d] transition"
          >Facebookで拡散</a>
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
