import React from "react";
import Alert from "@/components/AlertNotification/AlertNotification";
import { AlertVariants } from "@/components/AlertNotification/Alerts.enum";
import { render } from "@testing-library/react";
import { toast } from "react-hot-toast";
import { loginAccount } from "./AuthHelper";

const mockLoginAccount = jest.fn();

jest.mock('./AuthHelper', () => ({
    loginAccount: mockLoginAccount,
}));

describe ('AuthContextProvider', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('mock a successful login and show success notification', async () => {
        mockLoginAccount.mockResolvedValueOnce('success');

        const result = await mockLoginAccount();
        expect(result).toBe('success');
        
        const message = "You've successfully logged in!";
        const {getByText} = render(<Alert variant={AlertVariants.Success} message={message} />);
        expect(getByText(message)).toBeInTheDocument();
    });

    test('mock a failed login attempt and show error notification', async () => {
        mockLoginAccount.mockRejectedValueOnce('error');

        const result = await mockLoginAccount();
        expect(result).toBe('error');

        const message = "Something went wrong!";
        const {getByText} = render(<Alert variant={AlertVariants.Error} message={message} />);
        expect(getByText(message)).toBeInTheDocument();
    });
});