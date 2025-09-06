import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Noto_Serif_JP } from 'next/font/google' // ★★★ 変更点：Noto Serif JPをインポート ★★★
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Head from 'next/head'

// ★★★ 変更点：フォント読み込み設定 ★★★
const notoSerifJp = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-serif-jp',
})

export const metadata: Metadata = {
  title: '伝統品クイズ', // タイトルも変更
  description: '日本の美しい伝統品について学ぼう',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    return (
      <>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Hina+Mincho&display=swap" rel="stylesheet" />
        </Head>
        <html lang="ja">
          {/* ★★★ 変更点：フォント変数を追加 ★★★ */}
          <body className={`font-serif ${GeistSans.variable} ${notoSerifJp.variable}`}>
            {children}
            <Analytics />
          </body>
        </html>
      </>
    )
}
