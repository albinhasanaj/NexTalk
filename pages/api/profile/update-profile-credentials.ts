import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { getUserId } from "@/lib/getUserId";

interface UpdateProfileCredentials {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { username, email, password, confirmPassword } = req.body;
    const userId = await getUserId(req, res);
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // check if user is a github user or not
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // check if at least username or email or password is provided
    if (!username && !email && !password) {
        return res.status(400).json({ message: "At least one field is required" });
    }

    if (!user.githubId && !confirmPassword) {
        return res.status(400).json({ message: "Confirm password is required" });
    }

    const fieldsToUpdate: UpdateProfileCredentials = {};

    if (username.trim() !== "") {
        const userNameExists = await prisma.user.findFirst({
            where: {
                username: username
            }
        });

        if (userNameExists) {
            return res.status(400).json({ message: "Username already exists" });
        }

        fieldsToUpdate.username = username;
    }

    if (email.trim() !== "") {
        const emailExists = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (emailExists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        fieldsToUpdate.email = email;
    }

    let passwordMatch = null;
    if (!user.githubId) {
        passwordMatch = await bcrypt.compare(confirmPassword, user.password!);
        console.log("Password match:", passwordMatch)
        if (!passwordMatch) {
            return res.status(400).json({ message: "Confirm password does not match" });
        }
    } else {
        passwordMatch = true;
    }

    if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid password" });
    }

    // hash the new password if it is provided
    let hashedPassword = null;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
        fieldsToUpdate.password = hashedPassword;
    }

    // only update the fields that are provided else leave it like it is
    if (Object.keys(fieldsToUpdate).length > 0) {
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...fieldsToUpdate
            }
        });

        if (!updatedUser) {
            return res.status(500).json({ message: "Failed to update user" });
        }

        return res.status(200).json({ message: "User updated successfully" });
    } else {
        res.status(200).json({ message: "User updated successfully" });
    }

};