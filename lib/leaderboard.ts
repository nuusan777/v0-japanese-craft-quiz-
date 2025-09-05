//lib>leaderboard.ts
import type { LeaderboardEntry } from "@/types/quiz"

const LEADERBOARD_KEY = "quizLeaderboard"
const MAX_ENTRIES = 50

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem(LEADERBOARD_KEY)
  if (!stored) return []

  try {
    const entries = JSON.parse(stored) as LeaderboardEntry[]
    return entries.sort((a, b) => {
      // Sort by accuracy first, then by completion time (faster is better)
      if (a.accuracy !== b.accuracy) {
        return b.accuracy - a.accuracy
      }
      return a.completionTime - b.completionTime
    })
  } catch {
    return []
  }
}

export function addToLeaderboard(entry: Omit<LeaderboardEntry, "id" | "date">): void {
  if (typeof window === "undefined") return

  const currentEntries = getLeaderboard()
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    date: new Date(),
  }

  const updatedEntries = [...currentEntries, newEntry]
    .sort((a, b) => {
      if (a.accuracy !== b.accuracy) {
        return b.accuracy - a.accuracy
      }
      return a.completionTime - b.completionTime
    })
    .slice(0, MAX_ENTRIES)

  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedEntries))
}

export function getRank(accuracy: number, completionTime: number): number {
  const leaderboard = getLeaderboard()
  let rank = 1

  for (const entry of leaderboard) {
    if (entry.accuracy > accuracy || (entry.accuracy === accuracy && entry.completionTime < completionTime)) {
      rank++
    }
  }

  return rank
}

export function isTopScore(accuracy: number, completionTime: number): boolean {
  const leaderboard = getLeaderboard()
  if (leaderboard.length === 0) return true

  const topEntry = leaderboard[0]
  return accuracy > topEntry.accuracy || (accuracy === topEntry.accuracy && completionTime < topEntry.completionTime)
}
