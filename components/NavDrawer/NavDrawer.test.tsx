import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from './NavDrawer';
import userEvent from '@testing-library/user-event';

describe('Drawer', () => {
  it('renders correctly', () => {
    render(
      <Drawer>
        <DrawerTrigger data-testid="nav-trigger" />
        <DrawerContent data-testid="nav-content" />
      </Drawer>,
    );
    const element = screen.getByTestId('nav-trigger');
    userEvent.click(element);
  });
});
