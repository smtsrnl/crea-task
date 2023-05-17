'use client';
import { useEffect } from 'react'
import axios from 'axios'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:8000/';
  }, [])
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
