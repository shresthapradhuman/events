import React from 'react'
import Link from 'next/link'
import { HeadphonesIcon } from 'lucide-react'

const Logo = () => {
  return (
    <h1 className="text-2xl">
      <Link href={'/'} className="flex items-center font-bold">
        EVE
        <HeadphonesIcon className="stroke-primary mx-0.5 h-5 w-5 stroke-3" />
        TS
      </Link>
    </h1>
  )
}

export default Logo
