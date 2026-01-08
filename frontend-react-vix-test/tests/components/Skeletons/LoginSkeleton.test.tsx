import React from "react";
import { it, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import { LoginSkeleton } from "../../../src/components/Skeletons/LoginSkeleton";
import "@testing-library/jest-dom/vitest";

describe("HomePage/components/VmsCardsList", () => {
  it("should match snapshot", () => {
    const { container } = render(<LoginSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
