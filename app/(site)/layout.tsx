import React from 'react'
import Header from './_components/Header'
import Footer from './_components/Footer'

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

export default SiteLayout
