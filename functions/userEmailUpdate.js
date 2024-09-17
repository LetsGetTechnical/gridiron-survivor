// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

const { Query } = require('appwrite');
const sdk = require('node-appwrite');

/**
 * creates a new user record in the User collection
 * @param param - The parameters
 * @param param.req - The request object
 * @param param.res - The response object
 * @returns {void}
 */
const user = async ({ req, res }) => {
  // Init SDK
  const client = new sdk.Client();
  const databases = new sdk.Databases(client);

  client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.PROJECT_ID) // Your project ID
    .setKey(process.env.X_Appwrite_Key); // Your secret API key

  // update the user email
  if (req.method === 'POST' && req.body.email && req.body['$id']) {
    const userDocument = await databases.getDocument(
      process.env.DATABASE_ID,
      process.env.COLLECTION_USERS_ID,
      Query.equal('userId', req.body['$id']),
    );

    if (userDocument.email !== req.body.email) {
      return;
    }

    await databases.updateDocument(
      process.env.DATABASE_ID,
      process.env.COLLECTION_USERS_ID,
      userDocument.$id,
      {
        email: req.body.email,
        name: userDocument.name,
        labels: userDocument.labels,
        userId: userDocument.userId,
        leagues: userDocument.leagues,
      },
    );

    return res.json({ msg: 'User email successfully!' });
  }
};

module.exports = user;
