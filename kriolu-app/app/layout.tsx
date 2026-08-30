import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tradutor Kriolu',
  description: 'Traducteur kriolu badiu ↔ français avec phrases utiles et grammaire',
  viewport: 'width=device-width, initial-scale=1',
  authors: [{ name: 'Nicolas' }],
  icons: {
    icon: '🇨🇻',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
