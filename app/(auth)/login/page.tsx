// OLIVERS FILE SÅ RÖÖÖÖÖR INTE!!!!!!!!!!!!!!!!!!!!!

import React from 'react'

const login = () => {
    return (
        <div
            className="w-full h-[100vh] bg-black flex justify-center items-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(https://s3-alpha-sig.figma.com/img/c884/b435/fb3e6de4daebe15d82adaaf62b34de3f?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PzgsRNnn4lKyZXQVkgOFm4yO4OznUySJ6nK1qc9Qo9XVUR2fu84C3mX2OwG0T1wQ76s2yW2Os57emuHCmW989YBQiml7uUkVgjEJJJZrfAxtWNVEOs6~hIQ1ZubgrZ5yAWSQAfAXA6ehM3RFyQ99BMjk8Ez1Yf9z9d0BlEJj1wZAD9I8BCbq5XD7XjDnR3hkO6nPJPSE5wl~YEd3a--07TFxy3rKiUOlHJSodgIK6HwP6RCPYAel73dzf83lIprCX-CQm8cIGThCRW-S9n89Hxuqlr6pjWx8kQfgBECfTDNj6vuk6q9MrCqNO4TIdLZ0EjU4xE7jwQMVXYRxKT9SmA__)` }}
        >
            <div className="w-[350px] h-[750px] flex-shrink-0 rounded-l-3xl rounded-tr-none rounded-br-none rounded-bl-3xl border border-white/54 bg-white/7 backdrop-blur-[7.5px] flex justify-center bg-[rgba(255,255,255,0.07)]">
                {/* LEFT SIDE */}
                <div className='flex flex-col justify-between items-center'>
                    <h1 className='text-white text-[40px] not-italic font-bold leading-[normal] tracking-[2px] mt-[3.5rem]'>
                        Sign Up
                    </h1>
                    <img src="https://s3-alpha-sig.figma.com/img/24d0/04ce/c56e5f0225d194a10907784e7cb218e4?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bYtCOBI1vpr62rGFTTkEF6-MqB6tubMG9eY~jVTYfV3U2elFCIWlRy0sxK2IvM2bz9XR0ROfiLLckBpM2cyx5mqA3yYXSaalem-Rd8yGiELpg53cCH64ar7eBLCaAKkJVS8njVxnLfOaUNDly~EinoJRQd2NuvOb8dhpjJ8e2V0W0Kp1Pk9RB881EBcdjQ-7oGhnY4rhtLpC-8mfBr3ZNHUbPAXHGmgxh24aCuCDhFrLqV6c-iIuAx356l60AEG0hR5Xp5Wnz9hU~VYpjOlTmRD5L1Di6xx7wo0G3Rwwm1pAlLJCRoGyfNV-U2g8tceI~K3VkUn-KbwjTsyo7mI~oA__" alt="fin bild" />
                    <div className='flex flex-col items-center'>
                        <h2 className='text-[1.25rem] mb-[2rem]'>Don't have an account?</h2>
                        <button className='w-[122px] h-[50px] flex-shrink-0 rounded-[26.5px] border-white border-solid border-[1px] text-[1.25rem] tracking-[1px] mb-[3.5rem]'>Sign Up</button>
                    </div>
                </div>
            </div>

            <div className="w-[400px] lg:w-[600px] h-[750px] flex-shrink-0 rounded-r-3xl rounded-tl-none rounded-bl-none rounded-tr-3xl border border-white/54 bg-white/7 backdrop-blur-[7.5px] flex items-center bg-[rgba(255,255,255,0.07)] flex-col text-white justify-between">
                {/* RIGHT SIDE */}
                <h1 className="text-white text-[40px] not-italic font-bold leading-[normal] tracking-[2px] mb-10 mt-[3.5rem]">
                    Log in here</h1>
                <div className='flex flex-col items-center'>

                    {/* ALLA INPUTS */}
                    <div className='flex flex-col gap-[1.5rem] mb-[5rem]'>
                        {/* USER INPUT */}
                        <div className='flex flex-col'>
                            <label htmlFor="user" className='text-[12px] font-normal'>Username or Email Address*</label>
                            <input type="text" placeholder='JohnDoe' id='user' className="w-[299px] h-[50px] flex-shrink-0 rounded-[5px] border-solid border-[1px] border-white bg-[rgba(66,65,65,0.1)] text-[12px] pl-[13px]  font-normal" />
                        </div>

                        {/* PASSWORD INPUT */}
                        <div className='flex flex-col'>
                            <label htmlFor="password" className='text-[12px] font-normal'>Password*</label>
                            <input type="password" placeholder='******' id='password' className="w-[299px] h-[50px] flex-shrink-0 rounded-[5px] border-solid border-[1px] border-white bg-[rgba(66,65,65,0.1)] text-[12px] pl-[13px]  font-normal" />
                        </div>
                    </div>
                    <button className='w-[299px] h-[50px] bg-white text-black text-[20px] rounded-[36px] font-medium mt-[27px] mb-[27px]'>Sign Up</button>


                    <div className='flex gap-[13rem]'>
                        <div className='flex gap-2 justify-center'>
                            <input id="rememberMe" type="checkbox" className='mb-[34px]' />
                            <label htmlFor="rememberMe" className='text-[12px] font-normal mb-[34px]'>Remember Me</label>
                        </div>
                        <a href="" className='text-[12px] font-normal mb-[34px] text-[rgba(255,255,255,0.5)]'>Forgot Password</a>
                    </div>


                    <div className='flex gap-2 justify-center mb-[3.5rem]'>
                        <button className="w-[200px] h-[50px] flex-shrink-0 bg-[rgba(217,217,217,0.05)] border-white border-[1px] text-[12px] rounded-[5px]">Continue with Google</button>
                        <button className="w-[200px] h-[50px] flex-shrink-0 bg-[rgba(217,217,217,0.05)] border-white border-[1px] text-[12px] rounded-[5px]">Continue with Google</button>

                    </div>

                </div>

            </div >

        </div>
    )
}

export default login