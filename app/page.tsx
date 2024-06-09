import Footer from '@/components/Footer'
import MidHP from '@/components/MidHP'
import Navbar from '@/components/Navbar'
import TopHP from '@/components/TopHP'
import React from 'react'

const HomePage = () => {
    return (
        <div className='relative w-full h-screen'>
            <Navbar />
            <TopHP />
            <MidHP />
            <Footer />
        </div>
    )
}

export default HomePage