import { Client, Account } from 'appwrite';
import { appwriteConfig } from '../api/config';

const client = new Client();
const account = new Account(client);

