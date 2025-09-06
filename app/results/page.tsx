//app>results>page.tsx
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScoreChart } from "@/components/quiz/score-chart"
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground text-center">クイズ結果</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* New Top Score Banner */}
          {isNewTopScore && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 text-yellow-800">
                  <Award className="w-6 h-6" />
                  <span className="text-lg font-bold">新記録達成！おめでとうございます！</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                総合結果
                {currentRank && (
                  <Badge variant="secondary" className="ml-auto">
                    ランキング {currentRank}位
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold ${scoreGrade.bg} ${scoreGrade.color} mb-2`}
                  >
                    {scoreGrade.grade}
                  </div>
                  <p className="text-sm text-muted-foreground">総合評価</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {results.correctAnswers}/{results.totalQuestions}
                  </div>
                  <p className="text-sm text-muted-foreground">正解数</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{Math.round(results.accuracy)}%</div>
                  <p className="text-sm text-muted-foreground">正答率</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{formatTime(results.completionTime)}</div>
                  <p className="text-sm text-muted-foreground">所要時間</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>正答率</span>
                  <span>{Math.round(results.accuracy)}%</span>
                </div>
                <Progress value={results.accuracy} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <CategoryBreakdown categoryBreakdown={results.categoryBreakdown} />

          {/* Performance Chart */}
          <ScoreChart results={results} />

          {/* Detailed Review */}
          <Card>
            <CardHeader>
              <CardTitle>問題別詳細</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.questions.map((question, index) => {
                  const userAnswer = results.answers[index]
                  const isCorrect = userAnswer === question.answer

                  return (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">問題 {index + 1}</Badge>
                          <Badge className={isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {isCorrect ? "正解" : "不正解"}
                          </Badge>
                        </div>
                      </div>

                      <h4 className="font-medium mb-2 text-balance">{question.question}</h4>

                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">あなたの回答: </span>
                          <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                            {userAnswer || "未回答"}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">正解: </span>
                          <span className="text-green-600">{question.answer}</span>
                        </div>
                      </div>

                      {!isCorrect && (
                        <div className="mt-3 p-3 bg-muted rounded">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">解説: </span>
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Link href="/leaderboard">
              <Button variant="secondary" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                ランキングを見る
              </Button>
            </Link>
            <Link href="/quiz">
              <Button className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                もう一度挑戦
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">ホームに戻る</Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Score Submission Dialog */}
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
