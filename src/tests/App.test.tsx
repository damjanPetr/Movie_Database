import { getByRole, render, screen } from "@testing-library/react";

import { describe, it, expect } from "vitest";

const App = () => <h1>this is completet unneccesary</h1>;

describe("App component", () => {
  it("renders correct heading", () => {
    render(<App />);
    expect(screen.getByRole("heading").textContent).toMatch(/our first test/i);
  });
});
