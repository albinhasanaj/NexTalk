import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        res.setHeader(
            "Set-Cookie",
            "next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly"
        );
        return res.status(200).json({ message: "Logged out" });
    }

    res.setHeader(
        "Set-Cookie",
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
    return res.status(200).json({ message: "Logged out" });
};