import React from "react";
import { it, expect, describe, vi, beforeAll, afterAll } from "vitest";
import { render } from "@testing-library/react";
import { HomePage } from "../../../src/pages/Home";
import "@testing-library/jest-dom/vitest";
// import { useZTheme } from "../../../src/stores/useZTheme";

vi.mock("../../../src/stores/useZTheme", () => ({
  useZTheme: () => ({
    mode: "light",
    theme: {
      light: {
        mainBackground: "#FFFFFF",
        primary: "#000000",
        blue: "#0000FF",
        gray: "#CCCCCC",
        grayLight: "#EEEEEE",
        blueMedium: "#0000CC",
        btnDarkBlue: "#3333FF",
      },
      dark: {
        mainBackground: "#000000",
        primary: "#FFFFFF",
        blue: "#3333FF",
        gray: "#666666",
        grayLight: "#444444",
        blueMedium: "#2222FF",
        btnDarkBlue: "#FFFFFF",
      },
    },
  }),
}));

vi.mock("@nivo/geo", () => ({
  ResponsiveChoropleth: () => "ResponsiveChoropleth",
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children }) => <a href="/">{children}</a>,
}));

const mockDate = new Date("2023-01-01T12:00:00Z");

beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(mockDate);
});

afterAll(() => {
  vi.useRealTimers();
});

describe("HomePage", () => {
  it("should match snapshot", () => {
    const { container } = render(<HomePage />);
    expect(container).toMatchSnapshot();
  });
});
