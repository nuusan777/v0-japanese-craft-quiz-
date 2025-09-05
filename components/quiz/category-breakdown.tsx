//components>quiz>category-breakdown.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { KnowledgeCategory } from "@/types/quiz"
import { BookOpen, MapPin, Wrench, Users, Palette, Lightbulb } from "lucide-react"

interface CategoryBreakdownProps {
  categoryBreakdown: Record<KnowledgeCategory, { correct: number; total: number }>
}

export function CategoryBreakdown({ categoryBreakdown }: CategoryBreakdownProps) {
  const getCategoryInfo = (category: KnowledgeCategory) => {
    const info = {
      history: { label: "歴史・人物", icon: BookOpen, color: "text-blue-600" },
      geography: { label: "地理・産地", icon: MapPin, color: "text-green-600" },
      materials: { label: "材料・技法", icon: Wrench, color: "text-orange-600" },
      usage: { label: "用途・文化背景", icon: Users, color: "text-purple-600" },
      design: { label: "意匠・デザイン", icon: Palette, color: "text-pink-600" },
      trivia: { label: "豆知識・現代との関わり", icon: Lightbulb, color: "text-yellow-600" },
    }
    return info[category]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>分野別成績</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(categoryBreakdown).map(([category, stats]) => {
            const categoryInfo = getCategoryInfo(category as KnowledgeCategory)
            const percentage = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0
            const Icon = categoryInfo.icon

            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${categoryInfo.color}`} />
                  <span className="font-medium text-sm">{categoryInfo.label}</span>
                  <span className="text-sm text-muted-foreground ml-auto">
                    {stats.correct}/{stats.total}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                <p className="text-xs text-muted-foreground">正答率: {Math.round(percentage)}%</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
