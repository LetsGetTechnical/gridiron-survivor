import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './NavDrawer';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Drawer Component', () => {
  it('Drawer opens and closes properly', async () => {
    render(
      <Drawer>
        <DrawerTrigger data-testid="drawer-trigger">Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle data-testid="drawer-title">Title</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>,
    );
    const trigger = screen.getByTestId('drawer-trigger');
    expect(trigger.getAttribute('data-state')).toBe('closed');

    fireEvent.click(trigger);
    expect(trigger.getAttribute('data-state')).toBe('open');

    const closeButton = screen.getByTestId('drawer-close');
    fireEvent.click(closeButton);

    await waitFor(() =>
      expect(trigger.getAttribute('data-state')).toBe('closed'),
    );
  });

  it('Drawer sub-components render properly', () => {
    render(
      <Drawer>
        <DrawerTrigger data-testid="drawer-trigger">Open</DrawerTrigger>
        <DrawerContent data-testid="drawer-content">
          <DrawerHeader data-testid="drawer-header">
            <DrawerTitle data-testid="drawer-title">Title</DrawerTitle>
            <DrawerDescription data-testid="drawer-description">
              Description
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter data-testid="drawer-footer">Footer</DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );
    const trigger = screen.getByTestId('drawer-trigger');
    fireEvent.click(trigger);

    expect(screen.getByTestId('drawer-content')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-header')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-title')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-description')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-footer')).toBeInTheDocument();
  });
});
