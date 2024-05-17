import React, { ReactNode } from 'react'
import "./globals.css"
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body className={`${inter.className} bg-black`}>
        {children}
      </body>
    </html>
  )
}

export default RootLayout