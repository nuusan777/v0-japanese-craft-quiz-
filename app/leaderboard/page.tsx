//app>leaderboard>page.tsx
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LeaderboardPage() {
  // ダミーデータ（本番はAPI等で取得）
  const items = [
  { name: "津軽塗", pt: 130, img: "/Gemini_Generated_Image_s4kh33s4kh33s4kh.png" }, // 4位
  { name: "熊野筆", pt: 142, img: "/Gemini_Generated_Image_qn3bd2qn3bd2qn3b.png" }, // 2位
  { name: "輪島塗", pt: 158, img: "/Gemini_Generated_Image_rdq0jlrdq0jlrdq0.png" }, // 1位
  { name: "甲州印伝", pt: 135, img: "/images.jpg" }, // 3位
  { name: "土佐和紙折り紙", pt: 121, img: "/Gemini_Generated_Image_djusfydjusfydjus.png" }, // 5位
  ]
  const myItem = { name: "有田焼", rank: 35, total: 50 }

  return (
    <div className="min-h-screen bg-[#fdf6e3] font-serif flex flex-col items-center py-4 px-2">
      {/* タイトル・装飾 */}
      <div className="w-full max-w-md mx-auto text-center relative">
        <h1 className="text-3xl md:text-4xl font-bold tracking-widest mb-2">推し伝統品<br />ランキング</h1>
        <div className="text-lg mt-2">今キテルのは <span className="font-bold text-[#a67c52] text-xl">輪島塗</span></div>
      </div>

      {/* ランキンググラフ（カード枠） */}
      <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-gray-300 shadow p-4 flex flex-col items-center">
        <div className="flex justify-center items-end gap-2 w-full" style={{ minHeight: 220 }}>
          {(() => {
            // バー高さを最大120pxに正規化
            const maxPt = Math.max(...items.map(i => i.pt))
            return items.map((item, idx) => {
              const barHeight = Math.round((item.pt / maxPt) * 120)
              const rank = [4,2,1,3,5][idx];
              const isYellow = rank === 1 || rank === 4 || rank === 5;
              const barColor = isYellow ? '#f9e6a0' : '#f9d0e6';
              const ptColor = isYellow ? '#d19c5b' : '#d17cae';
              const imgBorder = isYellow ? 'border-yellow-400' : 'border-pink-300';
              const crown = rank === 1 ? (
                <svg width="40" height="30" viewBox="0 0 40 30" fill="none" className="mx-auto mb-[-10px]">
                  <ellipse cx="20" cy="10" rx="10" ry="10" fill="#f9e6a0" />
                  <path d="M10 10L20 2L30 10" stroke="#d19c5b" strokeWidth="2" fill="none" />
                </svg>
              ) : null;
              return (
                <div key={item.name} className="flex flex-col items-center justify-end text-center w-1/5">
                  {/* 王冠アイコン（1位のみ） */}
                  {crown}
                  {/* 円形画像枠 */}
                  <div className={`rounded-full border-4 ${imgBorder} w-16 h-16 md:w-20 md:h-20 overflow-hidden mb-2 flex items-center justify-center bg-white`}>
                    <img src={item.img} alt={item.name} className="object-cover w-full h-full" />
                  </div>
                  {/* バー */}
                  <div className="rounded-t-xl shadow flex items-end justify-center w-14 md:w-16" style={{ height: `${barHeight}px`, background: barColor }}>
                    <span className="font-bold text-base md:text-lg" style={{ color: ptColor, marginBottom: 0 }}>{item.pt}pt</span>
                  </div>
                  {/* 順位・品名 */}
                  <div className="text-xs md:text-base mt-2 font-bold text-[#222]">{[4,2,1,3,5][idx]}位</div>
                  <div className={`text-xs md:text-base mt-1 text-[#222]${item.name === '土佐和紙折り紙' ? ' whitespace-nowrap' : ''}`}>{item.name}</div>
                </div>
              )
            })
          })()}
        </div>
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
