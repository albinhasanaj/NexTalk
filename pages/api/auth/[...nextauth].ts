// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
        async session({ session, user, token }) {
            if (user) {
                session.user = session.user || {};  // Ensure user object exists
                (session.user as any).id = user.id as string;  // Use type assertion here
            }
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                (token as JWT).id = user.id as string;  // Use type assertion here
            }
            return token;
        }
    }
};

export default NextAuth(authOptions);
