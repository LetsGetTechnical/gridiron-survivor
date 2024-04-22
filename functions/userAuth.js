import sdk, { ID } from "appwrite";

async ({ req, res, log, error }) => {

    // Init SDK
    const client = new sdk.Client();

    const databases = new sdk.Databases(client);

    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject(process.env.PROJECT_ID) // Your project ID
        .setKey(process.env.X - Appwrite - Key) // Your secret API key

    // get all users
    if (req.method === "GET") {

    }

    // update users <user data>

    if (req.method === "PUT") {

    }

    // create a new user
    if (req.method === "POST") {
        await databases.createDocument(process.env.DATABASE_ID, process.env.COLLECTION_USERS_ID, ID.unique(), {});
        res.json({ msg: "User was created successfully!" });
    }

    // delete a user

    if (req.method === "DELETE") {

    }
};