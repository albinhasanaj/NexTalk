import React from 'react'
import MidFeatures from './MidFeatures'
import Collage from './Collage'
import Form from './Form'

const MidHP = () => {
    return (
        <div>
            <div className='bg-black w-full h-screen'>
                <MidFeatures />
            </div>
            <div className='bg-black w-full h-screen'>
                <Collage />
            </div>
            <div className='bg-black w-full h-screen'>
                <Form />
            </div>
        </div>
    )
}

export default MidHP