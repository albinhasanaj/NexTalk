import { NextApiRequest, NextApiResponse } from "next";
import { getUserId } from "@/lib/getUserId";
import prisma from "@/lib/prisma";
import { IncomingForm } from 'formidable';
import { randomUUID } from "crypto";
import fs from 'fs';
import path from 'path';
import sharp from "sharp";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        console.log("Method not POST, method is:", req.method);
        return res.status(405).json({ message: "Method not allowed" });
    }

    const form: any = new IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'public/images/profile');
    form.keepExtensions = true;

    form.parse(req, async (err: any, fields: any, files: any) => {
        if (err) {
            console.error("Error parsing form data:", err);
            return res.status(500).json({ message: "Error parsing the form data" });
        }

        if (!files.file) {
            console.log("No file part in the form.");
            return res.status(400).json({ message: "Image not found" });
        }

        const file = Array.isArray(files.file) ? files.file[0] : files.file;
        const { filepath, originalFilename } = file;
        if (!filepath || !originalFilename) {
            console.log("Missing file paths:", { filepath, originalFilename });
            return res.status(400).json({ message: "File path or name is undefined" });
        }

        const userId = await getUserId(req, res);
        if (!userId) {
            console.log("No user ID found in the request.");
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Generate a new filename with UUID
        const extension = path.extname(originalFilename);
        const newFilename = `${randomUUID()}${extension}`;
        const newFilePath = path.join(form.uploadDir, newFilename);

        // Compress and resize the image to 100px by 100px using sharp
        try {
            await sharp(filepath)
                .resize(100, 100, {
                    fit: sharp.fit.cover,
                    position: sharp.strategy.entropy
                })
                .toFile(newFilePath);

            // Optionally remove the original file immediately after processing
            fs.unlinkSync(filepath);

            const imageUrl = `/images/profile/${newFilename}`;
            console.log("Updating user profile pic URL in DB:", imageUrl);

            // Delete old file if it exists
            const existingUser = await prisma.user.findUnique({
                where: { id: userId },
            });
            if (existingUser && existingUser.profilePic) {
                const oldFilePath = path.join(process.cwd(), 'public', existingUser.profilePic);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }

            // Update the user profile with the new image URL
            const user = await prisma.user.update({
                where: { id: userId },
                data: { profilePic: imageUrl },
            });
            console.log("User profile updated successfully.");
            return res.status(200).json({ message: "Profile pic updated successfully", imageUrl });
        } catch (error) {
            console.error("Error processing image:", error);
            return res.status(500).json({ message: "Failed to process image" });
        }
    });
}
