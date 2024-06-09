import React from 'react'
import TryForFreeBtn from './TryForFreeBtn'
import Features from './Features'

const MidFeatures = () => {
    return (
        <div className='pt-10 flex flex-col items-center gap-10'>

            {/* DESKTOP */}
            <div className='hidden md2:flex items-center text-center flex-col gap-10 appearAnimation'>
                <div className='flex flex-col gap-3 max-w-[1440px]'>
                    <h1 className='text-white font-bold text-4xl xl:text-5xl'>Features Designed For <br /> Fun Chatting</h1>
                    <p className='text-[1rem] xl:text-xl mb-5'>Explore various features within this app, designed <br /> to enhance user experience to its fullest.</p>
                    <Features />
                </div>
                <TryForFreeBtn />
            </div>

            {/* MOBILE */}
            <div className='md2:hidden flex pt-10 flex-col items-center text-center gap-5 appearAnimation'>
                <div className='flex flex-col gap-4 px-4'>
                    <h1 className='text-white font-bold text-4xl xl:text-5xl'>Features Designed For <br /> Fun Chatting</h1>
                    <p className='text-[1rem] xl:text-xl'>Explore various features within <br />this app, designed to enhance <br />user experience to its fullest.</p>
                </div>
                <TryForFreeBtn />
                <Features />
            </div>
        </div>
    )
}

export default MidFeatures