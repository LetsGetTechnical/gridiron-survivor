import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  test('Renders default (primary) button', () => {
    render(<Button/>);
    const defaultButtton = document.querySelector('.bg-orange-600')
    expect(defaultButtton).toBeInTheDocument();
  })
})