import ChatpageSidebar from '@/components/ChatpageSiderbar'
import React from 'react'
import { getSession } from 'next-auth/react'
import { parseCookies } from 'nookies'
import jwt from 'jsonwebtoken'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

// this has to be a protected route
const ChatPage = () => {
    return (
        <ChatpageSidebar />
    )
}

export default ChatPage