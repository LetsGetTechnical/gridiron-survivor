import { Button } from '../Button/Button';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';
import React, { useState } from 'react';

describe('LoadingSpinner', () => {
  it('should render the loading spinner component when the button is clicked', () => {
    const TestButton = () => {
      const [isLoading, setIsLoading] = useState(false);

      function mockSendingData() {
        return new Promise((resolve) => {
          setIsLoading(true);
          setTimeout(() => {
            resolve(setIsLoading(false));
          }, 3000);
        });
      }

      return (
        <Button
          data-testid="continue-button"
          disabled={isLoading}
          label={isLoading ? <LoadingSpinner /> : 'Continue'}
          onClick={mockSendingData}
          type="submit"
        />
      );
    };
    render(<TestButton />);

    const button = screen.getByTestId('continue-button');
    const buttonLabel = button.textContent;

    expect(button).toBeInTheDocument();
    expect(buttonLabel).toBe('Continue');
    fireEvent.click(button);

    const loadingSpinner = screen.getByTestId('loading-spinner');

    expect(loadingSpinner).toBeInTheDocument();
    waitFor(() => expect(loadingSpinner).not.toBeInTheDocument(), {
      timeout: 3001,
    });
    expect(buttonLabel).toBe('Continue');
  });
});
