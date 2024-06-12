import Image from 'next/image'
import React from 'react'

const CollagePics = () => {
    return (
        <div className='flex gap-[27px] appearAnimation items-center'>
            <div className='flex flex-col gap-[27px]'>
                <div className='bg-white lg2:w-[250px] lg2:h-[200px] xs:w-[180px] xs:h-[144px] w-[144px] h-[115.2px] rounded-[15px] hover:scale-105 transform transition duration-300 ease-in-out flex items-center justify-center'>
                    <Image src='/images/img1.jpg' alt='collage' layout='fill' objectFit='cover' className='rounded-[15px] border-white border-[2px]' />
                </div>
                <div className='bg-white lg2:w-[250px] lg2:h-[200px] xs:w-[180px] xs:h-[144px] w-[144px] h-[115.2px] rounded-[15px] hover:scale-105 transform transition duration-300 ease-in-out flex items-center justify-center'>
                    <Image src='/images/img2.jpg' alt='collage' layout='fill' objectFit='cover' className='rounded-[15px] border-white border-[2px]' />
                </div>
            </div>
            <div className='lg2:w-[250px] lg2:h-[427px] xs:w-[180px] xs:h-[305px] w-[144px] h-[247px] rounded-[15px] hover:scale-105 transform transition duration-300 ease-in-out flex items-center justify-center'>
                <Image src='/images/img3.jpg' alt='collage' layout='fill' objectFit='cover' className='rounded-[15px] border-white border-[2px]' />
            </div>
        </div>
    )
}
export default CollagePics