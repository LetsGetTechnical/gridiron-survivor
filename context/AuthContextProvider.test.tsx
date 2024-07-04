import React from "react";
import Alert from "@/components/AlertNotification/AlertNotification";
import { AlertVariants } from "@/components/AlertNotification/Alerts.enum";
import { render } from "@testing-library/react";
import { toast } from "react-hot-toast";

const mockLoginAccount = jest.fn();

const mockUseAuthContext = {
    loginAccount: mockLoginAccount,
};

jest.mock('./AuthContextProvider',() => ({
    useAuthContext() {
        return {
            ...mockUseAuthContext,
        };
    },
}));

describe ('AuthContextProvider', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('mock a successful login and show success notification', async () => {
        await mockLoginAccount();
        mockLoginAccount.mockResolvedValueOnce('success');
        
        const message = "You've successfully logged in!";
        const {getByText} = render(<Alert variant={AlertVariants.Success} message={message} />);
        expect(getByText(message)).toBeInTheDocument();
    });

    test('mock a failed login attempt and show error notification', async () => {
        await mockLoginAccount();
        mockLoginAccount.mockRejectedValueOnce('error');
        expect(toast).toHaveBeenCalledWith(<Alert variant={AlertVariants.Error} message="Something went wrong!" />);
    });
});