import React from 'react';
import { render, screen } from '@testing-library/react';
import { WeeklyPickButton } from './WeeklyPickButton';
import { RadioGroup } from '../RadioGroup/RadioGroup';

// test one method
// provide some specific arguments to that method
// test that the result is as expected

const weeklyPickData = {
  team: 'Ravens',
  src: '/path/to/ravens.svg',
  height: '48',
  width: '48',
  alt: 'Ravens',
};

describe('WeeklyPickButton', () => {
  it('RadioGroup has the correct classes', () => {
    render(<RadioGroup />);

    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('grid w-full grid-cols-2 gap-4');
  });

  it('radio button has the correct classes', () => {
    render(
      <RadioGroup>
        <WeeklyPickButton team={weeklyPickData.team} src={weeklyPickData.src} />
      </RadioGroup>,
    );

    const radioButton = screen.getByRole('radio');
    expect(radioButton).toHaveClass('peer sr-only');
  });

  it('image should have a height of 48', () => {
    render(
      <RadioGroup>
        <WeeklyPickButton team={weeklyPickData.team} src={weeklyPickData.src} />
      </RadioGroup>,
    );

    const image = screen.getByRole('img', { name: /Ravens/i });
    expect(image).toHaveAttribute('height', weeklyPickData.height);
  });

  it('image should have a width of 48', () => {
    render(
      <RadioGroup>
        <WeeklyPickButton team={weeklyPickData.team} src={weeklyPickData.src} />
      </RadioGroup>,
    );

    const image = screen.getByRole('img', { name: /Ravens/i });
    expect(image).toHaveAttribute('width', weeklyPickData.width);
  });

  it('image should have path name in src', () => {
    render(
      <RadioGroup>
        <WeeklyPickButton team={weeklyPickData.team} src={weeklyPickData.src} />
      </RadioGroup>,
    );

    const image = screen.getByRole('img', { name: /Ravens/i });
    expect(image).toHaveAttribute('src', weeklyPickData.src);
  });

  it('image should have alt text', () => {
    render(
      <RadioGroup>
        <WeeklyPickButton team={weeklyPickData.team} src={weeklyPickData.src} />
      </RadioGroup>,
    );

    const image = screen.getByRole('img', { name: /Ravens/i });
    expect(image).toHaveAttribute('alt', weeklyPickData.alt);
  });

  it('renders correctly', () => {
    render(
      <RadioGroup>
        <WeeklyPickButton team={weeklyPickData.team} src={weeklyPickData.src} />
      </RadioGroup>,
    );
    const image = screen.getByRole('img', { name: /Ravens/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', weeklyPickData.src);
    const teamName = screen.getByText(/Ravens/i);
    expect(teamName).toBeInTheDocument();
  });

  it('check the initial team state', () => {});
});
