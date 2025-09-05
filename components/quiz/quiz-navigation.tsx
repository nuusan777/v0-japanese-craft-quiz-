//components>quiz>quiz-navigation.tsx
"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Check, Sparkles } from "lucide-react"

interface QuizNavigationProps {
  canGoBack: boolean
  canSubmit: boolean
  canNext: boolean
  isLastQuestion: boolean
  onPrevious: () => void
  onSubmit: () => void
  onNext: () => void
}

export function QuizNavigation({
  canGoBack,
  canSubmit,
  canNext,
  isLastQuestion,
  onPrevious,
  onSubmit,
  onNext,
}: QuizNavigationProps) {
  return (
    <div className="flex justify-between items-center animate-fade-in">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={!canGoBack}
        className="flex items-center gap-2 hover:scale-105 transition-all duration-200 disabled:hover:scale-100 bg-transparent"
      >
        <ChevronLeft className="w-4 h-4" />
        前の問題
      </Button>

      <div className="flex gap-3">
        {canSubmit && (
          <Button
            onClick={onSubmit}
            className="flex items-center gap-2 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg bg-gradient-to-r from-primary to-primary/90"
          >
            <Check className="w-4 h-4" />
            回答する
          </Button>
        )}

        {canNext && (
          <Button
            onClick={onNext}
            className="flex items-center gap-2 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
            variant={isLastQuestion ? "default" : "secondary"}
          >
            {isLastQuestion ? (
              <>
                <Sparkles className="w-4 h-4" />
                結果を見る
              </>
            ) : (
              <>
                次の問題
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
