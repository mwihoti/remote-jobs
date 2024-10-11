import React from 'react'

import Link from "next/link";
const Header = () => {
  return (
    <div><header>
    <div className="container items-center justify-between mx-auto py-4 flex">
      <Link href={'/'} className="font-bold text-xl"> Job Board</Link>
      <nav className="flex gap-2 *:px-4 *:py-2 *:rounded-md ">
        <Link href="/jobs" className="bg-gray-200 ">Jobs</Link>
        <Link href="/about" className="bg-blue-600">Post jobs</Link>
      </nav>
      </div>
  </header></div>
  )
}

export default Header