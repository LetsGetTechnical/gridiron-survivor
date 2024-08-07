// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import * as sdk from 'node-appwrite';

const URL = process.env.NEXT_PUBLIC_APPWRITE_API_URL as string;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string;
const API_KEY = process.env.APPWRITE_API_KEY as string;

const client = new sdk.Client()
  .setEndpoint(URL)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

export const users = new sdk.Users(client);
export const account = new sdk.Account(client);
