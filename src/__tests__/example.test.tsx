import { render, screen } from "@testing-library/react";

describe("Example Test", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });

  it("should render a div", () => {
    render(<div data-testid="test-div">Hello World</div>);
    expect(screen.getByTestId("test-div")).toBeInTheDocument();
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
