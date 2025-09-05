//components>quiz>score-chart.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { KnowledgeCategory } from "@/types/quiz"

interface ScoreChartProps {
  results: {
    categoryBreakdown: Record<KnowledgeCategory, { correct: number; total: number }>
    accuracy: number
  }
}

export function ScoreChart({ results }: ScoreChartProps) {
  const categories = Object.entries(results.categoryBreakdown)
  const maxTotal = Math.max(...categories.map(([, stats]) => stats.total))

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      history: "歴史・人物",
      geography: "地理・産地",
      materials: "材料・技法",
      usage: "用途・文化背景",
      design: "意匠・デザイン",
      trivia: "豆知識・現代との関わり",
    }
    return labels[category] || category
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>分野別パフォーマンス</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map(([category, stats]) => {
            const percentage = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0

            return (
              <div key={category} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{getCategoryLabel(category)}</span>
                  <span className="text-muted-foreground">
                    {stats.correct}/{stats.total} ({Math.round(percentage)}%)
                  </span>
                </div>

                <div className="relative">
                  <div className="w-full bg-muted rounded-full h-6">
                    <div
                      className="bg-primary h-6 rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage > 20 && (
                        <span className="text-xs text-primary-foreground font-medium">{Math.round(percentage)}%</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">{Math.round(results.accuracy)}%</div>
            <p className="text-sm text-muted-foreground">総合正答率</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
