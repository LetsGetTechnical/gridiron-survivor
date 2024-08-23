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
        const groupEmailTest = ['123456', '12345', '1234'];
        const subject = 'This is a test';

        (sendEmailNotifications as jest.Mock).mockImplementation(async ({content, groupEmailTest, subject}) => {
            await (messaging.createEmail as jest.Mock)('some-id', subject, content, [], groupEmailTest);
        })

        await sendEmailNotifications({content, groupEmailTest, subject});

        expect(messaging.createEmail).toHaveBeenCalledWith(
            expect.any(String),
            subject,
            content,
            [],
            groupEmailTest,
        );
    });
});