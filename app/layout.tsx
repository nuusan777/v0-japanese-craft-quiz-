import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Noto_Serif_JP } from 'next/font/google' // ★★★ 変更点：Noto Serif JPをインポート ★★★
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// ★★★ 変更点：フォント読み込み設定 ★★★
const notoSerifJp = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-serif-jp',
})

export const metadata: Metadata = {
  title: '伝統工芸品クイズ', // タイトルも変更
  description: '日本の美しい伝統工芸品について学ぼう',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja"> {/* langを日本語に */}
      {/* ★★★ 変更点：フォント変数を追加 ★★★ */}
      <body className={`font-serif ${GeistSans.variable} ${notoSerifJp.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
