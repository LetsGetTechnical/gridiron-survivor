import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from './Heading';

describe('Heading component', () => {
  test('renders the correct heading level with default props', () => {
    render(<Heading>Test Heading</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading.tagName.toLowerCase()).toBe('h1');
  });

  test('renders the correct heading level when specified', () => {
    render(<Heading heading="h2">Test Heading</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading.tagName.toLowerCase()).toBe('h2');
  });

  test('applies the correct CSS classes based on the heading level', () => {
    render(<Heading heading="h3">Test Heading</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('font-semibold', 'text-base', 'leading-8');
  });

  test('applies additional CSS classes when provided', () => {
    render(
      <Heading className="custom-class" heading="h4">
        Test Heading
      </Heading>,
    );
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass(
      'font-semibold',
      'text-sm',
      'leading-7',
      'custom-class',
    );
  });
});
