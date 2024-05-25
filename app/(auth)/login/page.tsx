// OLIVERS FILE SÅ RÖÖÖÖÖR INTE!!!!!!!!!!!!!!!!!!!!!

import React from 'react'
import Image from 'next/image'
import AuthForm from '@/components/AuthForm'

// this has to be an unprotected route until the user is logged in
const LogIn = () => {
    return (
        <>
            <AuthForm
                isLogin={true}
            />
        </>
    )
}

export default LogIn