import React from "react";
import Alert from "@/components/AlertNotification/AlertNotification";
import { AlertVariants } from "@/components/AlertNotification/Alerts.enum";
import { render, waitFor } from "@testing-library/react";

const mockCreateWeeklyPicks = jest.fn();
const mockUpdateWeeklyPicks = jest.fn();

const mockWeeklyPicks = {
    createWeeklyPicks: mockCreateWeeklyPicks,
    updateWeeklyPicks: mockUpdateWeeklyPicks,
};

jest.mock('./WeeklyPicks', () => {
    return {
        ...mockWeeklyPicks,
    };
});

describe('Weekly Picks', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('successfully picks team and shows success notification', async () => {
        const result = {
            gameId: '66311a210039f0532044',
            gameWeekId: '',
            userResults: {"6632eaa0a65cd59045ed":{"team":"browns","correct":true}},
        };

        await waitFor(() => {
            mockCreateWeeklyPicks.mockResolvedValueOnce(result);
            mockCreateWeeklyPicks(result);
            expect(mockCreateWeeklyPicks).toHaveBeenCalledWith(result);
        });

        await waitFor(() => {
            mockUpdateWeeklyPicks.mockResolvedValueOnce(result);
            mockUpdateWeeklyPicks(result);
            expect(mockUpdateWeeklyPicks).toHaveBeenCalledWith(result);
        });

        render(<Alert variant={AlertVariants.Success} message='You have successfully picked your team!' />);
    });

    test('shows error notification when picking a team errors out', async () => {
        const wrongResult = new Error('Error');

        await waitFor(() => {
            mockUpdateWeeklyPicks.mockRejectedValueOnce(wrongResult);
            mockCreateWeeklyPicks.mockRejectedValueOnce(wrongResult);
        });

        render(<Alert variant={AlertVariants.Error} message='There was an error processing your request!' />);
    });
});