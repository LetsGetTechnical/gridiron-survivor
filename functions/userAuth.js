import { Client, Databases } from "node-appwrite";

export default async ({ req, res, log, error }) => {
    try {
        if (req.method == "GET") {
            return res.json({ msg: "Request was successful!" });
        }
    } catch (err) {
        console.error(err);
    }
}