//app>leaderboard>page.tsx
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LeaderboardPage() {
  // ダミーデータ（本番はAPI等で取得）
  const items = [
  { name: "輪島塗", pt: 158, img: "/Gemini_Generated_Image_rdq0jlrdq0jlrdq0.png" },
  { name: "熊野筆", pt: 142, img: "/Gemini_Generated_Image_qn3bd2qn3bd2qn3b.png" },
  { name: "甲州印伝", pt: 135, img: "/images.jpg" },
  { name: "津軽塗", pt: 130, img: "/Gemini_Generated_Image_s4kh33s4kh33s4kh.png" },
  { name: "土佐和紙折り紙", pt: 121, img: "/Gemini_Generated_Image_djusfydjusfydjus.png" },
  ]
  const myItem = { name: "有田焼", rank: 35, total: 50 }

  return (
    <div className="min-h-screen bg-[#fdf6e3] font-serif flex flex-col items-center py-4 px-2">
      {/* タイトル・装飾 */}
      <div className="w-full max-w-md mx-auto text-center relative">
  <h1 className="text-3xl md:text-4xl font-bold tracking-widest mb-2">推し伝統品<br />ランキング</h1>
  <div className="text-lg mt-2">今キテルのは <span className="font-bold text-[#a67c52] text-xl">輪島塗</span></div>
  {/* ...existing code... */}
      </div>

      {/* バーチャート */}
      <div className="w-full max-w-md mx-auto flex justify-center items-end gap-2 mt-6 mb-2">
        {(() => {
          // バー高さを最大100pxに正規化
          const maxPt = Math.max(...items.map(i => i.pt))
          return items.map((item, idx) => {
            const barHeight = Math.round((item.pt / maxPt) * 100)
            return (
              <div key={item.name} className="flex flex-col items-center justify-end text-center">
                <div className="rounded-full border-4 border-[#e9e2d0] w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 overflow-hidden mb-4 shadow">
                  <img src={item.img} alt={item.name} className="object-cover w-full h-full" />
                </div>
        <div className={`bg-[#fbeee0] rounded-t-xl shadow flex items-end justify-center w-16 sm:w-20 md:w-24 mt-2`} style={{ height: `${barHeight}px` }}>
          <span className="text-[#d19c5b] font-bold text-lg sm:text-xl md:text-2xl" style={{ marginBottom: 0 }}>{item.pt}pt</span>
                </div>
                <div className="text-sm sm:text-base md:text-lg mt-4 font-bold text-[#a67c52]">{idx + 1}位</div>
                <div className={`text-sm sm:text-base md:text-lg mt-2 text-[#6e4c1b]${item.name === '土佐和紙折り紙' ? ' whitespace-nowrap' : ''}`}>{item.name}</div>
              </div>
            )
          })
        })()}
      </div>

      {/* 推し伝統品順位・応援メッセージ */}
      <div className="w-full max-w-md mx-auto text-center mt-4 mb-2">
  <p className="text-lg">あなたの推し伝統品「<span className="font-bold text-[#a67c52] text-xl">{myItem.name}</span>」は現在 <span className="font-bold text-[#6e4c1b] text-2xl">{myItem.rank}/{myItem.total}</span>位<br />伝統品愛好会で推しをもっと応援しよう！</p>
      </div>

      {/* 特典説明カード */}
      <div className="w-full max-w-md mx-auto flex flex-col md:flex-row gap-3 mt-2 mb-4">
        <Card className="flex-1 bg-[#fbeee0] shadow rounded-xl p-4 text-center">
          <CardContent>
            <div className="text-lg mb-2">抽選で<span className="font-bold text-[#a67c52] text-xl">4名様</span>を有田焼産地体験にご招待<br />工房でオリジナル自分だけの有田焼を作れる！</div>
          </CardContent>
        </Card>
        <Card className="flex-1 bg-[#fbeee0] shadow rounded-xl p-4 text-center">
          <CardContent>
            <div className="text-lg mb-2">抽選で<span className="font-bold text-[#a67c52] text-xl">5名様</span>に今だけの限定デザイン有田焼一筆セットをプレゼント！</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
