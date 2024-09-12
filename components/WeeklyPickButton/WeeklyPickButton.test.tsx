import React from 'react';
import { render, screen } from '@testing-library/react';
import { WeeklyPickButton } from './WeeklyPickButton';
import { RadioGroup } from '../RadioGroup/RadioGroup';

const weeklyPickData = {
  homeAway: 'Home',
  team: 'Ravens',
  src: '/path/to/ravens.svg',
  height: '48',
  width: '48',
  alt: 'Ravens',
};

describe('WeeklyPickButton', () => {
  it('renders correctly', () => {
    render(
      <RadioGroup>
        <WeeklyPickButton homeAway={weeklyPickData.homeAway} team={weeklyPickData.team} src={weeklyPickData.src} />
      </RadioGroup>,
    );

    const homeAwayLabel = screen.getByTestId('home-away');
    expect(homeAwayLabel).toBeInTheDocument();
    expect(homeAwayLabel).toHaveTextContent('Home');

    const image = screen.getByTestId('team-image');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', weeklyPickData.src);

    const teamName = screen.getByTestId('team-label');
    expect(teamName).toBeInTheDocument();

    expect(image).toHaveAttribute('width', weeklyPickData.width);
    expect(image).toHaveAttribute('height', weeklyPickData.height);
    expect(image).toHaveAttribute('alt', weeklyPickData.alt);
  });
});
