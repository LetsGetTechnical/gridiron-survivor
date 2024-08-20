'use server';
import { messaging } from "./sendEmailNotification";
import { sendEmailNotifications } from "./sendEmailNotification";

jest.mock('./sendEmailNotification', () => ({
    messaging: {
        createEmail: jest.fn(),
    },
    sendEmailNotifications: jest.fn(),
}));

describe('SendEmailNotification', () => {
    test('should send email with provided information', async () => {
        const content = 'Test';
        const participants = ['123456'];
        const subject = 'This is a test';

        (sendEmailNotifications as jest.Mock).mockImplementation(async ({content, participants, subject}) => {
            await (messaging.createEmail as jest.Mock)('some-id', subject, content, [], participants);
        })

        await sendEmailNotifications({content, participants, subject});

        expect(messaging.createEmail).toHaveBeenCalledWith(
            expect.any(String),
            subject,
            content,
            [],
            participants,
        );
    });
});