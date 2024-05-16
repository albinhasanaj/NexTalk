import React from 'react';

const SIGNUP = () => {
    return (
        <div
            className="w-full h-[100vh] bg-black flex justify-center items-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(https://s3-alpha-sig.figma.com/img/c884/b435/fb3e6de4daebe15d82adaaf62b34de3f?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PzgsRNnn4lKyZXQVkgOFm4yO4OznUySJ6nK1qc9Qo9XVUR2fu84C3mX2OwG0T1wQ76s2yW2Os57emuHCmW989YBQiml7uUkVgjEJJJZrfAxtWNVEOs6~hIQ1ZubgrZ5yAWSQAfAXA6ehM3RFyQ99BMjk8Ez1Yf9z9d0BlEJj1wZAD9I8BCbq5XD7XjDnR3hkO6nPJPSE5wl~YEd3a--07TFxy3rKiUOlHJSodgIK6HwP6RCPYAel73dzf83lIprCX-CQm8cIGThCRW-S9n89Hxuqlr6pjWx8kQfgBECfTDNj6vuk6q9MrCqNO4TIdLZ0EjU4xE7jwQMVXYRxKT9SmA__)` }}
        >
            <div className="w-[350px] h-[750px] flex-shrink-0 rounded-l-3xl rounded-tr-none rounded-br-none rounded-bl-3xl border border-white/54 bg-white/7 backdrop-blur-[7.5px] flex justify-center bg-[rgba(255,255,255,0.07)]">
                {/* LEFT SIDE */}
                <h1 className='text-white text-[40px] not-italic font-bold leading-[normal] tracking-[2px]'>
                    Sign Up
                </h1>
            </div>
            <div className="w-[400px] lg:w-[600px] h-[750px] flex-shrink-0 rounded-r-3xl rounded-tl-none rounded-bl-none rounded-tr-3xl border border-white/54 bg-white/7 backdrop-blur-[7.5px] flex items-center bg-[rgba(255,255,255,0.07)] flex-col text-white">
                {/* RIGHT SIDE */}
                <h1 className="text-white text-[40px] not-italic font-bold leading-[normal] tracking-[2px]">
                    Register here</h1>
                <div className='flex flex-col gap-10'>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col'>
                            <label htmlFor="username" className='text-[12px] font-normal' >Username*</label>
                            <input type="text" placeholder='JohnDoe' id='username' className="w-[138px] h-[35px] flex-shrink-0 rounded-[5px] border-solid border-[1px] border-white bg-[rgba(66,65,65,0.1)] text-[12px] pl-[13px]  font-normal" />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="nickname" className='text-[12px] font-normal'>Nickname</label>
                            <input type="text" placeholder='John' id='nickname' className="w-[138px] h-[35px] flex-shrink-0 rounded-[5px] border-solid border-[1px] border-white bg-[rgba(66,65,65,0.1)] text-[12px] pl-[13px] font-normal" />
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="email" className='text-[12px] font-normal'>Email Address*</label>
                        <input type="email" placeholder='johndoe@gmail.com' id='email' className="w-[299px] h-[50px] flex-shrink-0 rounded-[5px] border-solid border-[1px] border-white bg-[rgba(66,65,65,0.1)] text-[12px] pl-[13px]  font-normal" />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="password" className='text-[12px] font-normal'>Password*</label>
                        <input type="password" placeholder='******' id='password' className="w-[299px] h-[50px] flex-shrink-0 rounded-[5px] border-solid border-[1px] border-white bg-[rgba(66,65,65,0.1)] text-[12px] pl-[13px]  font-normal" />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="confirm-password" className='text-[12px] font-normal'>Confirm Password*</label>
                        <input type="password" placeholder='******' id='confirm-password' className="w-[299px] h-[50px] flex-shrink-0 rounded-[5px] border-solid border-[1px] border-white bg-[rgba(66,65,65,0.1)] text-[12px] pl-[13px]  font-normal" />
                    </div>

                </div>

            </div >
        </div >
    )
}

export default SIGNUP