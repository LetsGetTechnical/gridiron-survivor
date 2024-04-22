export default async ({ req, res, log, error }) => {
    if (req.method == "GET") {
        return res.send("Function was updated!");
    }
};