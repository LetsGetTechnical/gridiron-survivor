import WeekTeams from './WeekTeams';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockSchedule } from './__mocks__/mockSchedule';
import { FormProvider, useForm } from 'react-hook-form';
import { hasTeamBeenPicked, cn } from '@/utils/utils';

jest.mock('@/utils/utils', () => ({
  hasTeamBeenPicked: jest.fn(),
  cn: jest.fn(),
}));

const mockField = {
  name: 'value',
  value: '',
  ref: jest.fn(),
  onChange: jest.fn(),
  onBlur: jest.fn(),
};

const mockSelectedTeams = ['Packers'];

const mockDefaultUserPick = 'Ravens';
const mockNewUserPick = 'Chiefs';
const mockOnWeeklyPickChange = jest.fn();
const mockHasTeamBeenPicked = hasTeamBeenPicked as jest.Mock;

const TestWeekTeamsComponent = ({
  loadingTeamName,
}: {
  loadingTeamName: string;
}) => {
  const formMethods = useForm();
  return (
    <FormProvider {...formMethods}>
      <WeekTeams
        loadingTeamName={loadingTeamName}
        field={mockField}
        schedule={mockSchedule}
        selectedTeams={mockSelectedTeams}
        userPick={mockDefaultUserPick}
        onWeeklyPickChange={mockOnWeeklyPickChange}
      />
    </FormProvider>
  );
};

xdescribe('WeekTeams', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('the team should render active and the user currently has them selected', () => {
    mockHasTeamBeenPicked.mockReturnValue(false);

    render(<TestWeekTeamsComponent loadingTeamName={''} />);

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

    render(<TestWeekTeamsComponent loadingTeamName={''} />);
    const weeklyPickButtons = screen.getAllByTestId('team-label');

    const chiefsButton = weeklyPickButtons.filter(
      (button) => button.textContent === mockNewUserPick,
    )[0];

    expect(chiefsButton).toBeInTheDocument();
    expect(chiefsButton).not.toBeDisabled();

    fireEvent.click(chiefsButton);

    expect(mockOnWeeklyPickChange).toHaveBeenCalledWith(mockNewUserPick);
  });

  it('the team should render disabled if the team has already been used and the user should not be able to select the team', () => {
    mockHasTeamBeenPicked.mockReturnValue(true);

    render(<TestWeekTeamsComponent loadingTeamName={''} />);

    const weeklyPickButtons: HTMLButtonElement[] =
      screen.getAllByTestId('team-radio');

    const packersButton = weeklyPickButtons.filter(
      (button) => button.value === 'Packers',
    )[0];

    expect(packersButton).toBeInTheDocument();
    expect(packersButton).toBeDisabled();
  });

});
