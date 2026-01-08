import React from "react";
import { it, expect, describe, vi } from "vitest";
import { render } from "@testing-library/react";
import { LoginPage } from "../../../src/pages/Login";
import "@testing-library/jest-dom/vitest";
import loginJson from "../../../src/languages/en/loginRegister/loginRegisterPage.json";
// import { useZTheme } from "../../../src/stores/useZTheme";

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
  useZTheme: () => mockedTheme("dark"),
}));

vi.mock("react-router-dom", () => ({
  Link: ({ children }) => <a href="/">{children}</a>,
  useNavigate: () => vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (arg: string) => {
      const key = arg.split(".")[1];
      return loginJson[key];
    },
    i18n: { changeLanguage: vi.fn(), language: "en" },
  }),
}));

describe("LoginPage", () => {
  it("should match snapshot", () => {
    const { container } = render(<LoginPage />);
    expect(container).toMatchSnapshot();
  });
});
