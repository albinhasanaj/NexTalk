import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="w-full flex justify-center items-center">
            {children}
        </main>
    )
}

export default AuthLayout