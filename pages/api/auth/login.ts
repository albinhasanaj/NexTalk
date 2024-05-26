import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/generateAndValidateToken";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { usermail, password } = req.body;
    try {
        // check if user logged in with email or username
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: usermail },
                    { username: usermail }
                ]
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found', code: 404 });
        }

        // compare password
        const passwordMatch = await bcrypt.compare(password, user.password!); // It won't be null because we are logging in using email or username and not OAuth
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials', code: 401 });
        }

        // generate token
        const token = generateToken({ id: user.id, username: user.username, email: user.email });
        res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=2592000`); // 30 days
        return res.status(200).json({ message: 'Logged in successfully', code: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
}