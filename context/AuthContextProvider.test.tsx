import React from "react";
import { account } from "@/api/config";
import { loginAccount } from "./AuthHelper";
import { NextRouter } from "next/router";

const mockCreateEmailPasswordSession = jest.fn();
const mockGetUser = jest.fn();
account.createEmailPasswordSession = mockCreateEmailPasswordSession;

describe ('AuthContextProvider', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('mock a successful login and show success notification', async () => {
        const pretendUser = {
            email: 'testemail@email.com',
            password: 'password1234',
        };

        const mockRouter = {
          push: jest.fn(),
        } as unknown as NextRouter;

        await loginAccount(pretendUser, mockRouter, mockGetUser);
    });

    test('mock a failed login attempt and show error notification', async () => {
        
    });
});