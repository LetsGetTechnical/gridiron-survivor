import React from 'react';
import { render, screen } from '@testing-library/react';
import { WeeklyPickButton } from './WeeklyPickButton';
import { RadioGroup } from '../RadioGroup/RadioGroup';

const weeklyPickData = {
  team: 'Ravens',
  src: '/path/to/ravens.svg',
  height: '48',
  width: '48',
  alt: 'Ravens',
};

describe('WeeklyPickButton', () => {
  it.each(['Home', 'Away'])(
    'renders correctly with homeAway data',
    (homeAway) => {
      render(
        <RadioGroup>
          <WeeklyPickButton
            loadingTeamName={''}
            selectedTeam={''}
            homeAway={homeAway}
            team={weeklyPickData.team}
            src={weeklyPickData.src}
          />
        </RadioGroup>,
      );

      const homeAwayLabel = screen.getByTestId('home-away');
      expect(homeAwayLabel).toBeInTheDocument();
      expect(homeAwayLabel).toHaveTextContent(homeAway);

      const image = screen.getByTestId('team-image');

      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', weeklyPickData.src);

      const teamName = screen.getByTestId('team-label');
      expect(teamName).toBeInTheDocument();

      expect(image).toHaveAttribute('width', weeklyPickData.width);
      expect(image).toHaveAttribute('height', weeklyPickData.height);
      expect(image).toHaveAttribute('alt', weeklyPickData.alt);
    },
  );

  it('the loading spinner should display after team selection', () => {
    render(
      <RadioGroup>
        <WeeklyPickButton
          loadingTeamName={'packers'}
          selectedTeam={'packers'}
          homeAway={'Home'}
          team={weeklyPickData.team}
          src={weeklyPickData.src}
        />
      </RadioGroup>,
    );
    expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('the loading spinner should not display after team selection', () => {
    render(
      <RadioGroup>
        <WeeklyPickButton
          loadingTeamName={''}
          selectedTeam={'packers'}
          homeAway={'Home'}
          team={weeklyPickData.team}
          src={weeklyPickData.src}
        />
      </RadioGroup>,
    );
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
});
