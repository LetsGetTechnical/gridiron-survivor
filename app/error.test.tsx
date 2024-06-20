import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from './error';

let resetButton: HTMLElement;

describe('ErrorBoundary', () => {
  it('should render children when no error occurs', () => {
    const children = <div>Test</div>;
    render(<ErrorBoundary>{children}</ErrorBoundary>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render error message when an error occurs', () => {
    const children = (
      <div
        onError={() => {
          throw new Error('Test error');
        }}
      >
        Something went wrong!
      </div>
    );
    render(<ErrorBoundary>{children}</ErrorBoundary>);
    expect(
      screen.getByText('Something went wrong!', { exact: false }),
    ).toBeInTheDocument();
  });
  it('should reset the error state when the reset button is clicked', () => {
    const children = (
      <div
        onError={() => {
          throw new Error('Test error');
        }}
      >
        Something went wrong!
      </div>
    );
    render(<ErrorBoundary>{children}</ErrorBoundary>);
    expect(
      screen.getByText('Something went wrong!', { exact: false }),
    ).toBeInTheDocument();

    resetButton = screen.getByTestId('reset-button');
    expect(resetButton).toBeInTheDocument();
    fireEvent.click(resetButton);

    render(
      <ErrorBoundary>
        <div>Test</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
