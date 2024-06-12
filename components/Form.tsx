import React from 'react'

const Form = () => {
    return (
        <div className='flex flex-col items-center h-screen justify-center'>
            <div className='flex flex-col w-full items-center appearAnimation'>
                <div className='full-w-[1440px] w-full flex flex-col items-center gap-2 mb-3'>
                    <h1 className='text-white text-4xl xs:text-5xl font-bold'>Any questions?</h1>
                    <p className='text-[0.8rem] xs:text-[1rem]'>Feel free to send us a message!</p>
                </div>
                <form action="" className='w-full flex items-center flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="fullName">Full name*</label>
                        <input id='fullName' placeholder='John Doe' type="text" className='sm:w-[520px] xs:w-[380px] text-white h-[50px] w-[250px] bg-[rgba(66,65,65,0.10)] border-white border-[1px] rounded-[5px] px-2' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="mail">Email Address*</label>
                        <input id='mail' placeholder='johndoe@gmail.com' type="text" className='sm:w-[520px] xs:w-[380px] text-white h-[50px] w-[250px] bg-[rgba(66,65,65,0.10)] border-white border-[1px] rounded-[5px] px-2' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="message">Message*</label>
                        <textarea name="" id="message" placeholder='Type your message here...' className='sm:w-[520px] xs:w-[380px] text-white h-[165px] w-[250px] bg-[rgba(66,65,65,0.10)] border-white border-[1px] rounded-[5px] px-2 py-2'></textarea>
                    </div>
                    <button className='rounded-[5px] before:ease relative h-[2.5rem] w-[9rem] overflow-hidden bg-[#4D4D4D] text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-63 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40 hover:bg-[#585858]'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Form