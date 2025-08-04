import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

// Mock Next.js Image component
jest.mock("next/image", () => {
  return function MockImage({
    src,
    alt,
    width,
    height,
    priority,
    className,
  }: any) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        data-testid="next-image"
      />
    );
  };
});

// Mock window.alert
const mockAlert = jest.fn();
global.alert = mockAlert;

describe("Home Page", () => {
  beforeEach(() => {
    mockAlert.mockClear();
  });

  it("renders the page correctly", () => {
    render(<Home />);

    // Check if the main container is rendered
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders the Next.js logo image", () => {
    render(<Home />);

    const image = screen.getByTestId("next-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/next.svg");
    expect(image).toHaveAttribute("alt", "Next.js logo");
    expect(image).toHaveAttribute("width", "180");
    expect(image).toHaveAttribute("height", "38");
    expect(image).toHaveClass("dark:invert");
  });

  it("renders the instruction list", () => {
    render(<Home />);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass("font-mono", "list-inside", "list-decimal");
  });

  it("renders the first instruction item", () => {
    render(<Home />);

    expect(screen.getByText(/Get started by editing/)).toBeInTheDocument();
    expect(screen.getByText("src/app/page.tsx")).toBeInTheDocument();
  });

  it("renders the second instruction item", () => {
    render(<Home />);

    expect(
      screen.getByText("Save and see your changes instantly.")
    ).toBeInTheDocument();
  });

  it("renders the code element with correct styling", () => {
    render(<Home />);

    const codeElement = screen.getByText("src/app/page.tsx");
    expect(codeElement).toHaveClass(
      "bg-black/[.05]",
      "dark:bg-white/[.06]",
      "font-mono",
      "font-semibold"
    );
  });

  it("renders the Button component", () => {
    render(<Home />);

    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  it("shows alert when button is clicked", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const button = screen.getByTestId("button");
    await user.click(button);

    expect(mockAlert).toHaveBeenCalledWith("Hello");
    expect(mockAlert).toHaveBeenCalledTimes(1);
  });

  it("has correct layout classes", () => {
    render(<Home />);

    const mainContainer = screen.getByRole("main").parentElement;
    expect(mainContainer).toHaveClass(
      "font-sans",
      "grid",
      "grid-rows-[20px_1fr_20px]",
      "items-center",
      "justify-items-center",
      "min-h-screen"
    );
  });

  it("has responsive design classes", () => {
    render(<Home />);

    const main = screen.getByRole("main");
    expect(main).toHaveClass(
      "flex",
      "flex-col",
      "gap-[32px]",
      "row-start-2",
      "items-center",
      "sm:items-start"
    );
  });

  it("Test Nextjs-Jest-CICD should be in the document", () => {
    render(<Home />);

    expect(screen.getByText("Test Nextjs-Jest-CICD")).toBeInTheDocument();
  });
});
