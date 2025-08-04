import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../components/Button";

describe("Button Component", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toBeDisabled();
  });

  it("renders with custom text", () => {
    render(<Button>Custom Button Text</Button>);

    expect(screen.getByText("Custom Button Text")).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByTestId("button");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders different variants correctly", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByTestId("button")).toHaveClass("bg-blue-600");

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByTestId("button")).toHaveClass("bg-gray-200");

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByTestId("button")).toHaveClass("bg-red-600");
  });

  it("renders different sizes correctly", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByTestId("button")).toHaveClass(
      "px-3",
      "py-1.5",
      "text-sm"
    );

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByTestId("button")).toHaveClass(
      "px-4",
      "py-2",
      "text-base"
    );

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByTestId("button")).toHaveClass("px-6", "py-3", "text-lg");
  });

  it("renders disabled state correctly", () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByTestId("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-50", "cursor-not-allowed");
  });

  it("does not trigger onClick when disabled", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );

    const button = screen.getByTestId("button");
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders with custom type attribute", () => {
    render(<Button type="submit">Submit</Button>);

    expect(screen.getByTestId("button")).toHaveAttribute("type", "submit");
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>);

    const button = screen.getByTestId("button");
    expect(button).toHaveClass("custom-class");
  });

  it("renders with all props combined", () => {
    const handleClick = jest.fn();

    render(
      <Button
        variant="danger"
        size="lg"
        disabled
        type="submit"
        className="custom-class"
        onClick={handleClick}
      >
        Combined Props
      </Button>
    );

    const button = screen.getByTestId("button");
    expect(button).toHaveTextContent("Combined Props");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      "bg-red-600",
      "px-6",
      "py-3",
      "text-lg",
      "custom-class"
    );
  });
});
