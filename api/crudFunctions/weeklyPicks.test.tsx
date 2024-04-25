test('get weekly picks mock function', async () => {
    const users = { userId: '66174f2362ec891167be' };
    const resp = { data: users };

    // Mocking the getWeeklyPicks function
    jest.mock("./weeklyPicks", () => ({
        getWeeklyPicks: jest.fn().mockResolvedValue(resp)
    }));

    // Importing the mocked function
    const { getWeeklyPicks: mockGetWeeklyPicks } = require("./weeklyPicks");

    // Call the function
    const result = await mockGetWeeklyPicks();

    // Assertions
    expect(result).toEqual(resp); // Check if the result matches the expected response
});
