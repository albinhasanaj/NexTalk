import Image from 'next/image'
import React from 'react'
import AuthProviderButton from './AuthProviderButton'

const AuthProviderButtons = () => {
    return (
        <div className="flex gap-4 lg:gap-6">
            {/* Google */}
            <AuthProviderButton provider="google" />
            {/* Github */}
            <AuthProviderButton provider="github" />
        </div>
    )
}

export default AuthProviderButtons