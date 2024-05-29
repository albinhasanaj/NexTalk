import { NextApiRequest, NextApiResponse } from 'next'

import bcrypt from "bcrypt";
import prisma from '@/lib/prisma';
import { randomUUID } from 'crypto';
import { generateToken } from '@/lib/generateAndValidateToken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }


    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Bad request', code: 400 });
    }

    try {
        // Check if user already exists by email or username
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        if (existingUser) {
            return res.status(409).json({ message: `User with ${existingUser.username === username ? 'username' : 'email'} already exists`, code: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = randomUUID();

        const profilePic = `https://avatar.iran.liara.run/public?username=${username}`

        const user = await prisma.user.create({
            data: {
                id: userId,
                username,
                email,
                password: hashedPassword,
                profilePic
            }
        });

        const token = generateToken({ id: userId, username, email });
        res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=2592000`); // 30 days

        return res.status(201).json({ message: 'User created successfully', code: 201, data: user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
}