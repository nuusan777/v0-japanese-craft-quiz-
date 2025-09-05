//components>quiz>score-submission-dialog.tsx
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addToLeaderboard } from "@/lib/leaderboard"
import { Trophy, Award } from "lucide-react"

interface ScoreSubmissionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  results: {
    accuracy: number
    completionTime: number
  }
  currentRank: number | null
  isTopScore: boolean
}

export function ScoreSubmissionDialog({
  open,
  onOpenChange,
  results,
  currentRank,
  isTopScore,
}: ScoreSubmissionDialogProps) {
  const [playerName, setPlayerName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!playerName.trim()) return

    setIsSubmitting(true)

    try {
      addToLeaderboard({
        playerName: playerName.trim(),
        score: Math.round(results.accuracy),
        accuracy: results.accuracy,
        completionTime: results.completionTime,
      })

      // Close dialog after successful submission
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to submit score:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}分${remainingSeconds}秒`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isTopScore ? (
              <>
                <Award className="w-5 h-5 text-yellow-600" />
                新記録達成！
              </>
            ) : (
              <>
                <Trophy className="w-5 h-5 text-primary" />
                素晴らしい成績です！
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {isTopScore
              ? "新記録を達成しました！ランキングに名前を登録しませんか？"
              : `ランキング${currentRank}位の好成績です！名前を登録してランキングに参加しませんか？`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{Math.round(results.accuracy)}%</div>
              <p className="text-sm text-muted-foreground">正答率</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{formatTime(results.completionTime)}</div>
              <p className="text-sm text-muted-foreground">所要時間</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="playerName">プレイヤー名</Label>
            <Input
              id="playerName"
              placeholder="名前を入力してください"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={20}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSubmit} disabled={!playerName.trim() || isSubmitting} className="flex-1">
              {isSubmitting ? "登録中..." : "ランキングに登録"}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              スキップ
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
