import '@fontsource/poppins/500.css'
import '@fontsource/poppins/700.css'
import './globals.css'
import { Providers } from './providers'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head /> */}
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
