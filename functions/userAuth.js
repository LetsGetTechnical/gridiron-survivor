// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { ID } from 'appwrite';
import sdk from 'node-appwrite';
import { Collection } from '@/api/apiFunctions.enum';

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

  // create a new user
  if (
    req.method === 'POST' &&
    req.body.email &&
    req.body.email &&
    req.body['$id']
  ) {
    await databases.createDocument(
      process.env.DATABASE_ID,
      process.env.COLLECTION_USERS_ID,
      ID.unique(),
      {
        email: req.body.email,
        name: req.body.name,
        labels: req.body.labels,
        userId: req.body['$id'],
        leagues: ['66311a210039f0532044'],
      },
    );

    await databases.updateDocument(
      process.env.DATABASE_ID,
      Collection.LEAGUE,
      '66311a210039f0532044',
      {
        participants: [req.body['$id']],
        survivors: [req.body['$id']],
      },
    );

    return res.json({ msg: 'User was created successfully!' });
  }
};

module.exports = user;
