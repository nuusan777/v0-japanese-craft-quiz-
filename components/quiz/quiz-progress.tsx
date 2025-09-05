import { cn } from "@/lib/utils"

interface QuizProgressProps {
  current: number
  total: number
  className?: string
}

export function QuizProgress({ current, total, className }: QuizProgressProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0

  return (
    <div className={cn("space-y-2 animate-fade-in", className)}>
      {/* ★★★ 変更点：テキスト表示を大きく、中央に ★★★ */}
      <div className="text-center">
        <span className="text-2xl font-bold text-foreground tracking-wider">
          質問 {current} / {total}
        </span>
      </div>
      {/* ★★★ 変更点：シンプルな2色バーに変更 ★★★ */}
      <div className="w-full bg-secondary rounded-full h-2.5">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

