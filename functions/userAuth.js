const { ID } = require("appwrite");
const sdk = require("node-appwrite")

const user = async ({ req, res, log, error }) => {

    // Init SDK
    const client = new sdk.Client();

    const databases = new sdk.Databases(client);

    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject(process.env.PROJECT_ID) // Your project ID
        .setKey(process.env.X_Appwrite_Key) // Your secret API key

    // create a new user
    if (req.method === "POST") {
        await databases.createDocument(process.env.DATABASE_ID, process.env.COLLECTION_USERS_ID, ID.unique(), {
            "email": req.query.email,
            "name": req.query.name,
            "password": req.query.pasword,
            "labels": req.query.labels,
            "userId": req.query.userId
        });
        return res.json({ msg: "User was created successfully!" });
    }
};

module.exports = user;