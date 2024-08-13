import WeekTeams from './WeekTeams';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockSchedule } from './__mocks__/mockSchedule';
import { FormProvider, useForm } from 'react-hook-form';

const mockField = {
  name: 'value',
  value: '',
  ref: jest.fn(),
  onChange: jest.fn(),
  onBlur: jest.fn(),
};

const mockSelectedTeams = [
  {
    teamId: '1234',
    teamName: 'Packers',
    teamLogo: 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/gb.png',
  },
];

const mockDefaultUserPick = 'Ravens';
const mockNewUserPick = 'Chiefs';
const mockOnWeeklyPickChange = jest.fn();
const mockHasTeamBeenPicked = jest.fn();

const TestWeekTeamsComponent = () => {
  const formMethods = useForm();
  return (
    <FormProvider {...formMethods}>
      <WeekTeams
        field={mockField}
        schedule={mockSchedule}
        selectedTeams={mockSelectedTeams}
        userPick={mockDefaultUserPick}
        onWeeklyPickChange={mockOnWeeklyPickChange}
      />
    </FormProvider>
  );
};

describe('WeekTeams', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('the team should render active and the user currently has them selected', () => {
    mockHasTeamBeenPicked.mockReturnValue(false);

    render(<TestWeekTeamsComponent />);

    const weekTeamsRadioItems: HTMLButtonElement[] =
      screen.getAllByTestId('team-radio');
    const ravensRadioButton = weekTeamsRadioItems.filter(
      (radioItem) => radioItem.value === mockDefaultUserPick,
    )[0];

    expect(ravensRadioButton).toBeInTheDocument();
    expect(ravensRadioButton).not.toBeDisabled();

    expect(ravensRadioButton?.getAttribute('data-state')).toBe('checked');
  });

  it('the team should render active and the user should be able to select the team', () => {
    mockHasTeamBeenPicked.mockReturnValue(false);
    render(<TestWeekTeamsComponent />);
    const weeklyPickButtons = screen.getAllByTestId('team-label');

    const chiefsButton = weeklyPickButtons.filter(
      (button) => button.textContent === mockNewUserPick,
    )[0];

    expect(chiefsButton).toBeInTheDocument();
    expect(chiefsButton).not.toBeDisabled();

    fireEvent.click(chiefsButton);

    expect(mockOnWeeklyPickChange).toHaveBeenCalledWith(mockNewUserPick);
  });
});
