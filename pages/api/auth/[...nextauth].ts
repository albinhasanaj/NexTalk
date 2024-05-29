import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {

            if (account && account.provider == "github") {
                const githubUser = profile as { id: string; login: string; email: string };
                const githubId = githubUser.id.toString(); // Ensure this is a string

                // Check if the GitHub user exists in the database using githubId
                const existingUser = await prisma.user.findUnique({
                    where: {
                        githubId: githubId, // Correct field and data type
                    }
                });

                if (existingUser) {
                    return true; // User exists, allow sign in
                }

                // Ensure the username is unique
                let username = githubUser.login;
                const usernameExists = await prisma.user.findUnique({
                    where: {
                        username,
                    }
                });

                // If the username is taken, generate a new one
                if (usernameExists) {
                    let i = 1;
                    while (await prisma.user.findUnique({ where: { username: `${username}${i}` } })) {
                        i++;
                    }
                    username = `${username}${i}`;
                }

                // Generate a UUID for the user
                const id = randomUUID();

                const profilePic = `https://avatar.iran.liara.run/public?username=${username}`

                // Create the new user in the database
                const newUser = await prisma.user.create({
                    data: {
                        id: id,
                        githubId: githubId, // Storing GitHub ID as string
                        username,
                        email: githubUser.email || "",
                        profilePic
                    }
                });

                return newUser ? true : false;
            } else {
                return false;
            }
        },
        async jwt({ token, user }) {
            // Add id to the token
            if (user) {
                token.id = user.id as string;
            }
            return token;
        },
        async session({ session, token }) {
            // Add id to the session
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },
};

export default NextAuth(authOptions); 