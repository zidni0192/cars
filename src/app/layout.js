'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import styles from './layout.module.css'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Link href='/cars'>
              Cars
            </Link>
            <Link href='/orders'>
              Orders
            </Link>
          </nav>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
