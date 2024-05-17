import Image from 'next/image'
import React from 'react'

const AuthSidebar = () => {
    return (
        <div className="hidden md:flex w-[350px] h-[750px] flex-shrink-0 rounded-l-3xl rounded-tr-none rounded-br-none rounded-bl-3xl border border-white border-opacity-50 bg-white/7 backdrop-blur-[7.5px] justify-center bg-[rgba(255,255,255,0.07)] py-6">
            <div className='flex flex-col justify-between items-center'>
                <h1 className='text-white text-[40px] not-italic font-bold leading-[normal] tracking-[2px]'>
                    Sign Up
                </h1>
                <Image
                    src="/images/authillustration.png"
                    alt="Auth Illustration"
                    width={300}
                    height={300}
                    className='object-contain'
                />
                <div className='flex flex-col items-center'>
                    <h2 className='text-[1.25rem] mb-[2rem]'>Already have an account?</h2>
                    <button className='w-[122px] h-[50px] flex-shrink-0 rounded-[26.5px] border-white border-solid border-[1px] text-[1.25rem] tracking-[1px] mb-[3.5rem]'>Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default AuthSidebar