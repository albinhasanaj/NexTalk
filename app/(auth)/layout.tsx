import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="w-full h-screen flex justify-center items-center bg-nasa bg-cover bg-no-repeat">
            {children}
        </main>
    )
}

export default AuthLayout