import Image from 'next/image'
import React from 'react'
import TryForFreeBtn from './TryForFreeBtn';

const TopHP = () => {
    return (
        <main className='h-screen w-full bg-black'>

            {/* GRID IMAGE */}
            <div className='absolute inset-0 '>
                <Image
                    src='/images/grid.png'
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                    alt='hero'
                    className='w-full h-screen opacity-20 image__gradient'
                />
            </div>

            {/* HERO TEXT */}
            <div className='hidden md2:flex relative w-full h-screen items-center justify-center'>
                <div className='max-w-[1440px] flex items-center w-full justify-between px-20 mb-20'>
                    <div>
                        <Image
                            src='/images/chatpreview.png'
                            width={640}
                            height={500}
                            alt='hero-text'
                            className='hidden md2:flex lg2:w-[640px] lg2:h-[500px] w-[448px] h-[350px] hover:scale-105 transform transition duration-300 ease-in-out'
                        />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <h1 className=' text-white font-bold text-4xl xl:text-5xl '>REAL TIME <br />COMMUNICATION</h1>
                            <p className='text-[1rem] xl:text-xl'>From anywhere, with anyone.</p>
                        </div>
                        <TryForFreeBtn />
                    </div>
                </div>
            </div>

            {/* MOBILE */}
            <div className='md2:hidden relative w-full h-screen flex justify-center pt-10'>
                <div className='max-w-[930px] flex items-center w-full flex-col'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col items-center'>
                            <h1 className=' text-white font-bold text-center text-[1.5rem] leading-7 xs:text-[2rem] xs:leading-9'>REAL TIME <br />COMMUNICATION</h1>
                            <p className='text-[0.75rem] xs:text-[1rem]'>From anywhere, with anyone.</p>
                        </div>
                    </div>
                    <div>
                        <Image
                            src='/images/chatpreview.png'
                            width={358.4}
                            height={280}
                            alt='hero-text'
                            className='md2:hidden '
                        />
                    </div>
                    <TryForFreeBtn />
                </div>
            </div>
        </main>
    )
}

export default TopHP;
