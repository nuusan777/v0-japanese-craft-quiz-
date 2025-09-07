"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReviewCard, { Review } from "./ReviewCard";
import { useState } from "react";

const crafts = [
  "南部鉄器", "有田焼", "備前焼", "九谷焼", "輪島塗", "箱根寄木細工", "美濃和紙", "江戸切子", "別府竹細工", "楽焼", "熊野筆", "和墨（奈良墨）", "越前和紙（書道用）", "池坊流（華道）", "草月流（華道）", "江戸千代紙（折り紙）", "美濃和紙折り紙", "土佐和紙折り紙", "京風呂敷", "奈良暖簾", "京扇子", "江戸簪", "江戸根付", "山形手毬", "高崎だるま", "津軽こけし", "広島けん玉", "津軽笛", "能楽能管", "雅楽龍笛", "津軽三味線", "長唄三味線", "祭り太鼓（青森ねぶた）", "神楽太鼓（広島）", "江戸水墨画", "京都水墨画", "浮世絵", "静岡魚拓", "北海道魚拓", "会津刺子", "津軽刺子", "青森襤褸", "新潟襤褸", "藍染", "型染", "友禅染", "紅型", "つまみ細工", "水引", "組子", "七宝", "螺鈿", "蒔絵", "薩摩焼", "伊万里焼", "九谷焼", "備前焼", "萩焼", "信楽焼", "常滑焼", "益子焼", "笠間焼", "丹波焼", "越前焼"
];

export default function ReviewsPage() {
  const [selectedCraft, setSelectedCraft] = useState<string>(crafts[0]);
  const reviews: Review[] = [
    {
      user: "女性・主婦",
      age: 41,
      text: "最近、家族でふるさとを歩き回った先で一目ぼれしたから車でわざわざ買いに行きました。皿に盛りつけると伝統品が美味しそうに見えて、手にとりたくなる魅力がある。#有田焼 #推し伝統品",
      img: "/placeholder-user.jpg",
      likes: 24
    },
    {
      user: "男性・65歳",
      age: 65,
      text: "有田焼の湯呑は愛用しています。年齢を重ねると、ますます日本の伝統品が好きです。すごく丈夫で和の香りの良い気分に浸れます。",
      img: "/placeholder-user.jpg",
      likes: 37
    },
    {
      user: "学生・21歳",
      age: 21,
      text: "実家へ帰省したときに、本当に個人なら大事な物と感じました。ネットで調べて初めて知りましたが、有田焼の歴史や魅力をもっと知りたいです。おすすめの情報サイトがあれば教えてください！",
      img: "/placeholder-user.jpg",
      likes: 22
    },
    {
      user: "陶器販売店・43歳",
      age: 43,
      text: "もっと多くの人へ楽しんでもらいたいのでPRとして宣伝中です。オンラインショップ：https://arita-shop.jp/",
      img: "/placeholder-user.jpg",
      likes: 39
    }
  ];
  return (
  <div className="min-h-screen bg-[#f8f6e7] flex flex-col items-center py-4 relative">
      {/* 右上ホームボタン */}
      <a
        href="https://homepage-kappa-lemon.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm font-bold shadow hover:bg-gray-300 transition"
      >ホーム</a>
      <header className="w-full flex flex-col items-center mb-2">
  <h1 className="text-4xl font-extrabold text-foreground mb-2 tracking-wide">伝統品愛好会</h1>
        <span className="text-xs text-muted-foreground">いいねを投稿して推しのランキングUPを狙おう！</span>
      </header>
      <main className="w-full max-w-md mx-auto">
        <Card className="mb-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2 w-full">
              <CardTitle className="text-lg font-bold">推し伝統品 </CardTitle>
              <select
                value={selectedCraft}
                onChange={e => setSelectedCraft(e.target.value)}
                className="bg-transparent outline-none text-lg font-bold text-primary px-1 py-0 appearance-none"
                style={{ minWidth: '120px', cursor: 'pointer' }}
              >
                {crafts.map(craft => (
                  <option key={craft} value={craft} className="text-lg text-black bg-white">
                    {craft}
                  </option>
                ))}
              </select>
            </div>
          </CardHeader>
        </Card>
        {reviews.map((review, idx) => (
          <ReviewCard key={idx} review={review} />
        ))}
        <div className="mt-4 mb-8">
          <input type="text" placeholder="テキスト入力..." className="w-full rounded-full border px-4 py-2 text-sm" />
          <Button variant="outline" className="w-full mt-2 flex items-center justify-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            投稿する
          </Button>
        </div>
      </main>
    </div>
  );
}
