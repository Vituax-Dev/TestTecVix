import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { MainLoginForm } from "../../../../../src/pages/Login/components/MainLoginForm";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../../../../src/stores/useZTheme", () => ({
  useZTheme: () => ({
    mode: "light",
    theme: {
      light: { blue: "#0000FF", light: "#FFFFFF" },
      dark: { blue: "#0000FF", light: "#000000" },
    },
  }),
}));

let currentLanguage = "en";
const changeLanguageMock = vi.fn((language) => {
  currentLanguage = language;
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations = {
        "loginRegister.join": "Join",
      };
      return translations[key] || key;
    },
    i18n: {
      language: currentLanguage,
      changeLanguage: changeLanguageMock,
    },
  }),
}));

describe("MainLoginForm Component", () => {
  it("toggles 'KeepLogged' checked state on checkbox click", () => {
    render(
      <MemoryRouter>
        <MainLoginForm />
      </MemoryRouter>,
    );

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
