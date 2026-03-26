import React from 'react'
import { Nunito, Poppins } from 'next/font/google'
import './styles.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-heading',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`${nunito.className} ${poppins.variable} bg-[var(--color-app-bg)]`}>
        <main>{children}</main>
      </body>
    </html>
  )
}
