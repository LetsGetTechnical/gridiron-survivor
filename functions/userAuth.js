export default async ({ req, res, log, error }) => {
    if (req.method == "GET") {
        return context.res.send("Function was updated!");
    }
};