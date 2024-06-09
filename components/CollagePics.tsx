import React from 'react'

const CollagePics = () => {
    return (
        <div className='flex gap-[27px] appearAnimation items-center'>
            <div className='flex flex-col gap-[27px]'>
                <div className='bg-white lg2:w-[250px] lg2:h-[200px] xs:w-[180px] xs:h-[144px] w-[144px] h-[115.2px] rounded-[15px] hover:scale-105 transform transition duration-300 ease-in-out flex items-center justify-center'>
                    <h1 className='text-black font-bold text-2xl'>IMAGE 1</h1>
                </div>
                <div className='bg-white lg2:w-[250px] lg2:h-[200px] xs:w-[180px] xs:h-[144px] w-[144px] h-[115.2px] rounded-[15px] hover:scale-105 transform transition duration-300 ease-in-out flex items-center justify-center'>
                    <h1 className='text-black font-bold text-2xl'>IMAGE 2</h1>
                </div>
            </div>
            <div className='bg-white lg2:w-[250px] lg2:h-[427px] xs:w-[180px] xs:h-[305px] w-[144px] h-[247px] rounded-[15px] hover:scale-105 transform transition duration-300 ease-in-out flex items-center justify-center'>
                <h1 className='text-black font-bold text-2xl'>IMAGE 3</h1>
            </div>
        </div>
    )
}
export default CollagePics