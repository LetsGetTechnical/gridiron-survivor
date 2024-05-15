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
  className:
    'text-base font-normal leading-none text-zinc-50 cursor-pointer flex gap-2 items-center rounded-xl border-2 border-zinc-800 peer-aria-checked:border-orange-600 py-4 px-3 w-full peer-hover:bg-zinc-800 transition',
};

describe('WeeklyPickButton', () => {
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
    expect(teamName).toHaveClass(weeklyPickData.className);

    expect(image).toHaveAttribute('width', weeklyPickData.width);
    expect(image).toHaveAttribute('height', weeklyPickData.height);
    expect(image).toHaveAttribute('alt', weeklyPickData.alt);
  });
});
