import React, { ReactNode } from 'react'
import "./globals.css"
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black scrollbar`} suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout