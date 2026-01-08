import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { it, expect, describe } from "vitest";
import "@testing-library/jest-dom/vitest";
import { InputLabel } from "../../../src/components/Inputs/Input";

describe("components/Buttons/Btn", () => {
  it("should match snapshot", () => {
    const { container } = render(<InputLabel />);
    expect(container).toMatchSnapshot();
  });

  it("onClick function should do nothing if not passed in props", () => {
    render(<InputLabel />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveValue("");
    // const initialHTML = btn.outerHTML;
    // fireEvent.click(btn);
    // expect(btn.outerHTML).toBe(initialHTML);
  });
});
