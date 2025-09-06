"use client"

import { useState, useEffect } from "react"
import type { QuizSession, GenreKey, QuizQuestion } from "@/types/quiz"
import { QuestionDisplay } from "@/components/quiz/question-display"
import { QuizProgress } from "@/components/quiz/quiz-progress"
import { QuizNavigation } from "@/components/quiz/quiz-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { calculateQuizResults } from "@/lib/quiz-data"

export default function QuizPage() {
  const [session, setSession] = useState<QuizSession | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isQuizComplete, setIsQuizComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const selectedGenre = (localStorage.getItem("selectedGenre") as GenreKey) || "all"
        const response = await fetch(`/api/quiz?genre=${encodeURIComponent(selectedGenre)}`)
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to fetch quiz: ${response.status}`)
        }
        const data = await response.json()
        if (!data.success || !data.questions || data.questions.length === 0) {
          throw new Error(data.error || "クイズの問題が見つかりませんでした。")
        }
        const newSession: QuizSession = {
          id: `quiz-${Date.now()}`,
          questions: data.questions,
          currentQuestionIndex: 0,
          answers: new Array(data.questions.length).fill(null),
          score: 0,
          startTime: new Date(),
        }
        setSession(newSession)
      } catch (err) {
        setError(err instanceof Error ? err.message : "クイズの読み込みに失敗しました")
      } finally {
        setIsLoading(false)
      }
    }
    fetchQuizQuestions()
  }, [])

  const handleAnswerSelect = (answer: string) => {
    if (!showExplanation) {
      setSelectedAnswer(answer)
    }
  }

  const handleAnswerSubmit = () => {
    if (!session || selectedAnswer === null) return;
    const updatedAnswers = [...session.answers]
    updatedAnswers[session.currentQuestionIndex] = selectedAnswer
    setSession({
      ...session,
      answers: updatedAnswers,
    })
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (!session) return;
    if (session.currentQuestionIndex < session.questions.length - 1) {
      setSession({
        ...session,
        currentQuestionIndex: session.currentQuestionIndex + 1,
      })
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      const endTime = new Date()
      const completionTime = Math.round((endTime.getTime() - session.startTime.getTime()) / 1000)
      const results = calculateQuizResults(session.questions, session.answers, completionTime)
      localStorage.setItem("quizResults", JSON.stringify({
        ...results,
        sessionId: session.id,
        questions: session.questions,
        answers: session.answers,
        startTime: session.startTime,
        endTime,
      }))
      setIsQuizComplete(true)
    }
  }

  if (isLoading) { return <div className="min-h-screen bg-card flex items-center justify-center font-serif"><p className="text-lg">クイズを準備中...</p></div> }
  if (error) {
    return (
      <div className="min-h-screen bg-card flex items-center justify-center p-4 font-serif">
        <Card className="w-full max-w-md bg-background">
          <CardHeader><CardTitle className="text-destructive">エラーが発生しました</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center">{error}</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => window.location.reload()}>再試行</Button>
              <Link href="/genre-selection"><Button variant="outline">ジャンル選択に戻る</Button></Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  if (!session) { return <div className="min-h-screen bg-card flex items-center justify-center p-4 font-serif"><p>セッションを開始できませんでした。</p></div> }
  if (isQuizComplete) {
    return (
      <div className="min-h-screen bg-card flex items-center justify-center p-4 font-serif">
        <Card className="w-full max-w-md text-center bg-background">
          <CardHeader><CardTitle className="text-2xl text-primary">クイズ完了！</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">お疲れ様でした！</p>
            <Button onClick={() => router.push("/results")}>結果を見る</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = session.questions[session.currentQuestionIndex]

  return (
    <div className="min-h-screen bg-card flex flex-col font-serif">
      {/* ★★★ 変更点：ヘッダーに終了ボタンを追加 ★★★ */}
      <header className="py-4 px-4 relative">
        <div className="container mx-auto flex flex-col items-center">
          <h1 className="text-4xl font-bold tracking-widest text-foreground text-center break-words max-w-3xl mx-auto">推し理解度判定クイズ</h1>
          <p className="text-xs text-muted-foreground text-center mt-2">正解数に応じてランクアップ！</p>
        </div>
        <div className="absolute top-2 right-2 z-10">
          <Link href="/genre-selection">
            <Button variant="outline" size="sm">終了</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <QuizProgress current={session.currentQuestionIndex + 1} total={session.questions.length} className="mb-8" />
          <QuestionDisplay question={currentQuestion} selectedAnswer={selectedAnswer} onAnswerSelect={handleAnswerSelect} showExplanation={showExplanation} className="mb-8" />
          <QuizNavigation
            canGoBack={false}
            canSubmit={selectedAnswer !== null && !showExplanation}
            canNext={showExplanation}
            isLastQuestion={session.currentQuestionIndex === session.questions.length - 1}
            onPrevious={() => {}}
            onSubmit={handleAnswerSubmit}
            onNext={handleNextQuestion}
          />
        </div>
      </main>
      
      <footer
        className="w-full h-56 bg-bottom"
        style={{
          backgroundImage: 'url("/unnamed.png")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'left 5px bottom',
        }}
      >
      </footer>
    </div>
  )
}

