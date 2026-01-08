import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { it, expect, describe } from "vitest";
import "@testing-library/jest-dom/vitest";
import { Btn } from "../../../src/components/Buttons/Btn.tsx";

describe("components/Buttons/Btn", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <Btn
        onClick={() => {}}
        sx={{}}
        className="test-class"
        type="button"
        id="test-id"
        children={<p>testing</p>}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("onClick function should do nothing if not passed in props", () => {
    render(
      <Btn
        sx={{}}
        className="test-class"
        type="button"
        id="test-id"
        children={<p>testing</p>}
      />,
    );
    const btn = screen.getByRole("button");
    const initialHTML = btn.outerHTML;
    fireEvent.click(btn);
    expect(btn.outerHTML).toBe(initialHTML);
  });
});
