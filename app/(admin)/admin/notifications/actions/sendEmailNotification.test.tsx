'use server';
import { messaging } from "@/api/serverConfig";
import { sendEmailNotifications } from "./sendEmailNotification";

jest.mock('./sendEmailNotification', () => ({
    sendEmailNotifications: jest.fn(),
}))

jest.mock('@/api/serverConfig', () => ({
    messaging: {
        createEmail: jest.fn(),
    },
}));

describe('SendEmailNotification', () => {
    it('should send email with provided information', async () => {
        const content = 'Test';
        const groupUsers = ['123456', '12345', '1234'];
        const subject = 'This is a test';

        (sendEmailNotifications as jest.Mock).mockImplementation(async ({content, groupUsers, subject}) => {
            await (messaging.createEmail as jest.Mock)('1234567890', subject, content, [], groupUsers);
        })

        await sendEmailNotifications({content, groupUsers, subject});

        expect(messaging.createEmail).toHaveBeenCalledWith(
            expect.any(String),
            subject,
            content,
            [],
            groupUsers,
        );
    });
});