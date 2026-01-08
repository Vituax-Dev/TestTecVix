import React from "react";
import { it, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import { FullPage } from "../../../src/components/Skeletons/FullPage";
import "@testing-library/jest-dom/vitest";

describe("HomePage/components/VmsCardsList", () => {
  it("should match snapshot", () => {
    const { container } = render(<FullPage />);
    expect(container).toMatchSnapshot();
  });
});
