"use client";
import React from 'react'
import { ImCross } from "react-icons/im";
import { RxHamburgerMenu } from "react-icons/rx";
import TryForFreeBtn from './TryForFreeBtn'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (

        // vvvv DESKTOP NAVBAR vvvv
        <nav className='w-full relative z-10'>
            <div className="hidden md:flex justify-between items-center py-6 px-20">
                <h1 className="text-white text-3xl font-bold">NexTalk</h1>
                <ul className='flex gap-6 lg:gap-10 items-center text-white'>
                    <Link href="/" className="text-[1.2rem] hover:underline"> Home </Link>
                    <Link href="/about" className="text-[1.2rem] hover:underline"> About </Link>
                    <Link href="/about" className="text-[1.2rem] hover:underline"> Contact </Link>
                    <Link href="/login" className="text-[1.2rem] hover:underline"> Log In </Link>
                    <TryForFreeBtn />
                </ul>
            </div>
            {/* ^^^^ DESKTOP NAVBAR ^^^^ */}


            {/*vvvv MOBILE NAVBAR vvvv*/}
            <div className="md:hidden flex">
                <div className="md:hidden w-full flex items-center relative justify-between pr-2 pl-3">
                    <h1 className="text-white text-2xl font-bold">NexTalk</h1>
                    <Image src={isOpen ? "/icons/cross.svg" : "/icons/burger-menu.svg"}
                        alt="Hamburger Menu"
                        width={64}
                        height={64}
                        onClick={() => setIsOpen(prev => !prev)}
                        className="cursor-pointer"
                    />
                    {isOpen && (
                        <div className="absolute top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-black bg-opacity-80 flex flex-col items-center justify-center overflow-hidden">
                            <ul className="flex flex-col gap-5 items-center">
                                <Link href="/" className="text-white text-2xl hover:underline"> Home </Link>
                                <Link href="/about" className="text-white text-2xl hover:underline"> About </Link>
                                <Link href="/about" className="text-white text-2xl hover:underline"> Contact </Link>
                                <Link href="/login" className="text-white text-2xl hover:underline"> Log In </Link>
                                <TryForFreeBtn />
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {/*^^^^ MOBILE NAVBAR ^^^^*/}
        </nav>
    )
}

export default Navbar