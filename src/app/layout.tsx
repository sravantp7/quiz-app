import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Quiz App',
  description: 'Quiz Application using Nextjs 13',
}

type PropsType = {
  children: React.ReactNode
}

export default function RootLayout({children}: PropsType) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
