import React from 'react'
import MidFeatures from './MidFeatures'
import Collage from './Collage'
import Form from './Form'

const MidHP = () => {
    return (
        <div>
            <div className='bg-black w-full '>
                <MidFeatures />
            </div>
            <div className='bg-black w-full '>
                <Collage />
            </div>
            <div className='bg-black w-full '>
                <Form />
            </div>
        </div>
    )
}

export default MidHP