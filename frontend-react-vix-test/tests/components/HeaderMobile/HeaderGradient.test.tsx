import React from "react";
import { it, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import { HeaderGradient } from "../../../src/components/HeaderMobile/HeaderGradient";
import "@testing-library/jest-dom/vitest";

describe("HomePage/components/VmsCardsList", () => {
  it("should match snapshot", () => {
    const { container } = render(<HeaderGradient />);
    expect(container).toMatchSnapshot();
  });
});
