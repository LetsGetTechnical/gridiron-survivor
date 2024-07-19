// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { ID } from 'appwrite';
import { Client, Databases } from 'node-appwrite';

/**
 * creates a new user record in the User collection
 * @param param - The parameters
 * @param param.req - The request object
 * @param param.res - The response object
 * @returns {void}
 */
const user = async ({ req, res }) => {
  // Init SDK
  const client = new Client();
  const databases = new Databases(client);

  client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.PROJECT_ID) // Your project ID
    .setKey(process.env.X_Appwrite_Key); // Your secret API key

  // create a new user
  if (req.method === 'POST' && req.body.email && req.body['$id']) {
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

    // get the list of participants and survivors from the league
    const league = await databases.getDocument(
      process.env.DATABASE_ID,
      '6626a937b6302f6a4d28',
      '66311a210039f0532044',
    );

    // add the new user id to the list of participants and survivors
    const updatedParticipants = [...league.participants, req.body['$id']];
    const updatedSurvivors = [...league.survivors, req.body['$id']];

    // update the league with the new users id into the list of participants and survivors
    await databases.updateDocument(
      process.env.DATABASE_ID,
      '6626a937b6302f6a4d28',
      '66311a210039f0532044',
      {
        participants: updatedParticipants,
        survivors: updatedSurvivors,
      },
    );

    return res.json({ msg: 'User was created successfully!' });
  }
};

export default user;
