import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { LogoVituax } from "../../src/icons/LogoVituax";

describe("LogoVituax Icon", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(<LogoVituax />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
