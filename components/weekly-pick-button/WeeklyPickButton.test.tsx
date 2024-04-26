import React from 'react';
import { render, screen } from '@testing-library/react';
import { WeeklyPickButton } from './WeeklyPickButton';
import { RadioGroup } from './RadioGroup';

describe('WeeklyPickButton', () => {
  it('renders correctly', () => {
    render(
      <RadioGroup>
        <WeeklyPickButton team="Test Team" src="/path/to/image.svg" />
      </RadioGroup>,
    );

    const image = screen.getByRole('img', { name: /Test Team/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/path/to/image.svg');

    const teamName = screen.getByText(/Test Team/i);
    expect(teamName).toBeInTheDocument();
  });
});
