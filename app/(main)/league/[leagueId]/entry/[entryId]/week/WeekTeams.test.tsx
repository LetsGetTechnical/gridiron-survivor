import React, { Dispatch, useState as useStateMock } from 'react';
import WeekTeams from './WeekTeams';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
const setState = jest.fn();
const mockLoadingTeamName = '';
const mockSetTeamName = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn().mockImplementation((init) => [init, mockSetTeamName]),
}));

const TestWeekTeamsComponent = () => {
  const formMethods = useForm();
  return (
    <FormProvider {...formMethods}>
      <WeekTeams
        loadingTeamName={mockLoadingTeamName}
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
  const useStateMock = (init: any): [unknown, Dispatch<unknown>] => [
    init,
    setState,
  ];

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

  it('the team should render disabled if the team has already been used and the user should not be able to select the team', () => {
    mockHasTeamBeenPicked.mockReturnValue(true);

    render(<TestWeekTeamsComponent />);

    const weeklyPickButtons: HTMLButtonElement[] =
      screen.getAllByTestId('team-radio');

    const packersButton = weeklyPickButtons.filter(
      (button) => button.value === 'Packers',
    )[0];

    expect(packersButton).toBeInTheDocument();
    expect(packersButton).toBeDisabled();
  });

  describe('team loading spinner', () => {
    it('should show the loading spinner', async () => {
      jest.fn().mockImplementationOnce(() => ['packers', mockSetTeamName]);

      render(<TestWeekTeamsComponent />);

      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });
    });

    it('should not show the loading spinner', async () => {
      jest.fn().mockImplementationOnce(() => ['ravens', mockSetTeamName]);

      render(<TestWeekTeamsComponent />);

      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });
    });
  });
});
