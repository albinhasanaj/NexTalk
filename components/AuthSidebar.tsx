import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AuthSidebar = ({ href }: { href: string }) => {
    return (
        <div className="hidden md:flex w-[300px] lg:w-[350px] h-[600px] lg:h-[750px] flex-shrink-0 rounded-l-3xl rounded-tr-none rounded-br-none rounded-bl-3xl border border-white border-opacity-50 bg-white/7 backdrop-blur-[7.5px] justify-center bg-[rgba(255,255,255,0.07)] py-6">
            <div className='flex flex-col justify-between items-center'>
                <h1 className='text-white text-[40px] not-italic font-bold leading-[normal] tracking-[2px] text-center'>
                    {href === '/login' ? 'Welcome' : 'Welcome back'}
                </h1>
                <Image
                    src="/images/authillustration.png"
                    alt="Auth Illustration"
                    width={300}
                    height={300}
                    className='object-contain'
                />

                <div className='flex flex-col items-center gap-4 text-white'>
                    <h2 className='text-[1.25rem]'>Already have an account?</h2>
                    <Link
                        href={href}
                        className='px-10 py-2 text-center rounded-[26px] border-white border-solid border-[1px]'>
                        {href !== '/login' ? 'Sign Up' : 'Log In'}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AuthSidebar