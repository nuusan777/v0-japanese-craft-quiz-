//app>leaderboard>page.tsx
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getLeaderboard } from "@/lib/leaderboard"
import type { LeaderboardEntry } from "@/types/quiz"
import Link from "next/link"
import { Trophy, Medal, Award, Clock, Target, User } from "lucide-react"

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const entries = getLeaderboard()
    setLeaderboard(entries)
    setLoading(false)
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-600" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return (
          <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">
            {rank}
          </span>
        )
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case 2:
        return "bg-gray-100 text-gray-800 border-gray-200"
      case 3:
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p className="text-center">ランキングを読み込み中...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground text-center">ランキング</h1>
          <p className="text-muted-foreground text-center mt-2">日本伝統工芸品クイズ - トップスコア</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Top 3 Podium */}
          {leaderboard.length > 0 && (
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {leaderboard.slice(0, 3).map((entry, index) => {
                const rank = index + 1
                return (
                  <Card key={entry.id} className={`${rank === 1 ? "ring-2 ring-yellow-200" : ""}`}>
                    <CardHeader className="text-center pb-2">
                      <div className="flex justify-center mb-2">{getRankIcon(rank)}</div>
                      <CardTitle className="text-lg">{entry.playerName}</CardTitle>
                      <Badge className={getRankBadgeColor(rank)}>{rank}位</Badge>
                    </CardHeader>
                    <CardContent className="text-center space-y-2">
                      <div className="text-2xl font-bold text-primary">{Math.round(entry.accuracy)}%</div>
                      <div className="text-sm text-muted-foreground">{formatTime(entry.completionTime)}</div>
                      <div className="text-xs text-muted-foreground">{formatDate(entry.date)}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Full Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                全ランキング
              </CardTitle>
            </CardHeader>
            <CardContent>
              {leaderboard.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">まだランキングデータがありません</p>
                  <Link href="/quiz">
                    <Button>クイズに挑戦する</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {leaderboard.map((entry, index) => {
                    const rank = index + 1
                    return (
                      <div
                        key={entry.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border ${
                          rank <= 3 ? "bg-muted/50" : "hover:bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center justify-center w-8">{getRankIcon(rank)}</div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium truncate">{entry.playerName}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{Math.round(entry.accuracy)}%</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{formatTime(entry.completionTime)}</span>
                          </div>

                          <div className="text-muted-foreground text-xs hidden md:block">{formatDate(entry.date)}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Link href="/quiz">
              <Button>クイズに挑戦</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">戻る</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
