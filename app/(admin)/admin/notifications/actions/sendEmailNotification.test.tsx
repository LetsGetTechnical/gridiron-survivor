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
        const sendEmailUsers = ['123456', '12345', '1234'];
        const subject = 'This is a test';

        (sendEmailNotifications as jest.Mock).mockImplementation(async ({content, sendEmailUsers, subject, testBCC}) => {
            await (messaging.createEmail as jest.Mock)('1234567890', subject, content, [], sendEmailUsers, [], [], []);
        })

        await sendEmailNotifications({content, sendEmailUsers, subject});

        expect(messaging.createEmail).toHaveBeenCalledWith(
            expect.any(String),
            subject,
            content,
            [],
            sendEmailUsers,
            [],
            [],
            [],
        );
    });
});