"use client"
import { UserButton } from '@clerk/nextjs'

import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

const Header = () => {

    const path = usePathname();
    useEffect(()=>{
console.log(path)
    },[])
  return (
    <div className='flex p-5 items-center justify-between bg-secondary shadow-sm'>
       <nav className="bg-[#0a002c] sticky top-0 z-50 flex justify-between items-center px-6 py-4 shadow-md backdrop-blur-md">
        <h1 className="text-2xl font-bold text-pink-500">Micropen</h1>

        <div className="space-x-6">
          <a href="#about" className="hover:text-pink-400">About</a>
          <a href="#features" className="hover:text-pink-400">Features</a>
          <a href="#testimonials" className="hover:text-pink-400">Testimonials</a>
          <a href="#contact" className="hover:text-pink-400">Contact</a>
        </div>
      </nav>
        <UserButton/>
    </div>
  )
}

export default Header