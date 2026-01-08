import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { it, expect, describe, vi, beforeAll, Mock, afterAll } from "vitest";
import "@testing-library/jest-dom/vitest";
import { SimpleInput } from "../../../src/components/Inputs/SimpleInput";
import { useZTheme } from "../../../src/stores/useZTheme";

const mockedTheme = (mode: "light" | "dark" = "dark") => ({
  mode: mode,
  theme: {
    light: {
      blue: "#0000FF",
      primary: "#FFFFFF",
      mainBackground: "#FFFFFF",
      light: "#000000",
    },
    dark: {
      blue: "#3333FF",
      primary: "#000000",
      mainBackground: "#000000",
      light: "#FFFFFF",
    },
  },
});

vi.mock("../../../src/stores/useZTheme", () => ({
  useZTheme: vi.fn(),
}));

beforeAll(() => {
  (useZTheme as unknown as Mock).mockReturnValue(mockedTheme());
});

afterAll(() => {
  (useZTheme as unknown as Mock).mockRestore();
});

describe("SimpleInput Component", () => {
  it("renders correctly with the default props", () => {
    (useZTheme as unknown as Mock).mockRestore();
    (useZTheme as unknown as Mock).mockReturnValue(mockedTheme("dark"));
    const { getByPlaceholderText } = render(
      <SimpleInput value="" onChange={() => {}} placeholder="Enter text" />,
    );
    const inputElement = getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls onChange when the input value changes", () => {
    const handleChange = vi.fn();
    const { getByPlaceholderText } = render(
      <SimpleInput value="" onChange={handleChange} placeholder="Enter text" />,
    );
    const inputElement = getByPlaceholderText("Enter text");

    fireEvent.change(inputElement, { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalledWith("new value");
  });

  it("toggles password visibility when the icon is clicked", () => {
    const { getByPlaceholderText, getByRole } = render(
      <SimpleInput
        value="password"
        onChange={() => {}}
        type="password"
        placeholder="Enter password"
      />,
    );
    const inputElement = getByPlaceholderText("Enter password");
    expect(inputElement).toHaveAttribute("type", "password");

    const visibilityButton = getByRole("button", {
      name: /toggle password visibility/i,
    });
    fireEvent.click(visibilityButton);

    expect(inputElement).toHaveAttribute("type", "text");
  });

  it("renders the visibility icon when the type is password", () => {
    const { getByRole } = render(
      <SimpleInput value="" onChange={() => {}} type="password" />,
    );

    const visibilityButton = getByRole("button", {
      name: /toggle password visibility/i,
    });
    expect(visibilityButton).toBeInTheDocument();
  });

  it("hides the visibility icon when showIcon is false", () => {
    const { queryByRole } = render(
      <SimpleInput
        value=""
        onChange={() => {}}
        type="password"
        showIcon={false}
      />,
    );

    const visibilityButton = queryByRole("button", {
      name: /toggle password visibility/i,
    });
    expect(visibilityButton).toBeNull();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <SimpleInput value="" onChange={() => {}} placeholder="Enter text" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
