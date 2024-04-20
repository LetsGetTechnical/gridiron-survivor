import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

it('should render a button with no variant defined', () => {
  render(<Button />)
  const defaultButton = screen.getByRole('button')
  expect(defaultButton).toHaveClass('bg-orange-600')
})