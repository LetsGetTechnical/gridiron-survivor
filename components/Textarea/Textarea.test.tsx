import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './Textarea';
import React from 'react';

describe('Textarea Component', () => {
  it('renders without crashing', () => {
    render(<Textarea />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeInTheDocument();
  });

  it('applies the provided className', () => {
    const className = 'custom-class';
    render(<Textarea className={className} />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass(className);
  });

  it('calls onChange handler when text is entered', () => {
    const handleChange = jest.fn();
    render(<Textarea onChange={handleChange} />);
    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, { target: { value: 'New text' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('updates value when props.value changes', () => {
    const { rerender } = render(<Textarea value="Initial value" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveValue('Initial value');

    rerender(<Textarea data-testid="textarea" value="Updated value" />);
    expect(textarea).toHaveValue('Updated value');
  });

  it('respects minHeight and maxHeight props', () => {
    render(<Textarea minHeight={100} maxHeight={200} />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea.style.minHeight).toBe('102px'); // 100 + offsetBorder
    expect(textarea.style.maxHeight).toBe('200px');
  });

  it('auto resizes based on content', () => {
    render(<Textarea minHeight={100} maxHeight={200} />);
    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, {
      target: { value: 'A very long text that should trigger auto resize' },
    });
    expect(textarea.style.height).not.toBe('102px'); // Should have resized
  });
});
