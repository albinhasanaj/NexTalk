import React from 'react'
import TryForFreeBtn from './TryForFreeBtn'
import CollagePics from './CollagePics'

const Collage = () => {
    return (
        <div>
            {/* DESKTOP */}
            <div className='md2:flex hidden flex-row gap-7 mx-[5rem] justify-center items-center'>
                <div className='flex max-w-[1440px] justify-between w-full'>
                    <div className='gap-7 flex flex-col'>
                        <div className='flex flex-col gap-2 appearAnimation'>
                            <h1 className='lg2:text-5xl text-4xl text-white font-bold lg2:leading-[50px]'>Powered by the <br /> most powerful <br /> technologies</h1>
                            <p className='lg2:text-[1rem] text-[0.8rem]'>At NexTalk, we use the most advanced <br />technologies to ensure a smooth and beautiful user <br /> experience, as well as keeping you and your data <br /> safe.</p>
                        </div>
                        <TryForFreeBtn />
                    </div>
                    <CollagePics />
                </div>
            </div>

            {/* MOBILE */}
            <div className="flex md2:hidden flex-col items-center gap-7 pt-5">
                <div className='gap-7 flex flex-col items-center'>
                    <div className='flex flex-col gap-2 appearAnimation'>
                        <h1 className='lg2:text-5xl text-4xl text-white font-bold lg2:leading-[50px] text-center '>Powered by the <br /> most powerful <br /> technologies</h1>
                        <p className='lg2:text-[1rem] text-[0.8rem] text-center'>At NexTalk, we use the most advanced <br />technologies to ensure a smooth and beautiful user <br /> experience, as well as keeping you and your data <br /> safe.</p>
                    </div>
                </div>
                <CollagePics />
                <div className='mt-4'>
                    <TryForFreeBtn />
                </div>
            </div>
        </div>
    )
}

export default Collage
