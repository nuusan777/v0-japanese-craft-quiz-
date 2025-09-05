"use client"

import type { QuizQuestion } from "@/types/quiz"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CheckCircle, XCircle, Info } from "lucide-react"

interface QuestionDisplayProps {
  question: QuizQuestion
  selectedAnswer: string | null
  onAnswerSelect: (answer: string) => void
  showExplanation: boolean
  className?: string
}

export function QuestionDisplay({
  question,
  selectedAnswer,
  onAnswerSelect,
  showExplanation,
  className,
}: QuestionDisplayProps) {
  // These helper functions can remain as they are, but are not used in the new design.
  // You can keep them for future reference or remove them.
  const getDifficultyColor = (difficulty: string) => {
    // ...
  }
  const getCategoryLabel = (category: string) => {
    // ...
  }
  const getDifficultyLabel = (difficulty: string) => {
    // ...
  }

  return (
    // ★★★ 変更点：Cardのデザインをシンプルに ★★★
    <div className={cn("bg-transparent border-none shadow-none", className)}>
      <CardHeader className="text-center px-0">
        {/* ★★★ 変更点：問題文を大きく、中央揃えに ★★★ */}
        <CardTitle className="text-2xl md:text-3xl text-foreground font-bold text-balance leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4 px-0">
        {/* ★★★ 変更点：選択肢を2x2のグリッドレイアウトに ★★★ */}
        {question.options && (
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option
              const isCorrect = option === question.answer
              const isIncorrect = showExplanation && isSelected && !isCorrect

              return (
                <Button
                  key={index}
                  // ★★★ 変更点：ボタンの見た目を大きく変更 ★★★
                  variant="outline"
                  className={cn(
                    "h-28 md:h-32 text-lg md:text-xl font-bold whitespace-normal transition-all duration-200 shadow-md",
                    "bg-card border-border hover:bg-accent text-card-foreground font-serif", // フォントを明朝体に
                    isSelected && !showExplanation && "ring-2 ring-primary border-primary",
                    showExplanation && isCorrect && "!bg-primary !text-primary-foreground !border-primary",
                    showExplanation && !isCorrect && "bg-muted text-muted-foreground",
                    isIncorrect && "!bg-destructive/20 !text-destructive !border-destructive/50",
                  )}
                  onClick={() => !showExplanation && onAnswerSelect(option)}
                  disabled={showExplanation}
                >
                  {option}
                </Button>
              )
            })}
          </div>
        )}

        {/* Explanation (解説部分のデザインも少し調整) */}
        {showExplanation && (
          <Card className="bg-accent/50 animate-fade-in-up mt-6!">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-bold mb-1 text-primary">解説</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed font-sans">{question.explanation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </div>
  )
}

