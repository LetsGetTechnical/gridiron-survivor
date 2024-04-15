import { Client, Account } from 'appwrite';

const client = new Client();

const account = new Account(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // GIS Account
    .setProject('5df5acd0d48c2') // GIS Account
    ;

const email = 'email@example.com';
const password = 'password';

const promise = account.createSession(email, password);

promise.then(
    (response) => {
        console.log('Login successful:', response); // Success
    },
    (error) => {
        console.log('Login failed:', error); // Failure
    }
);

//code for login success/fail