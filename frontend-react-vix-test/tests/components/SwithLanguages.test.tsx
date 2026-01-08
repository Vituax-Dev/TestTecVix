import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { it, expect, describe, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { SwithLanguages } from "../../src/components/SwithLanguages";
import { useTranslation } from "react-i18next";

let currentLanguage = "en";
const changeLanguageMock = vi.fn((language) => {
  currentLanguage = language;
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      language: currentLanguage,
      changeLanguage: changeLanguageMock,
    },
  }),
}));

// Mock para `useZTheme`
vi.mock("../path/to/useZTheme", () => ({
  useZTheme: () => ({
    mode: "light",
    theme: {
      light: {
        blue: "#0000FF",
        primary: "#FFFFFF",
        mainBackground: "#FFFFFF",
      },
      dark: {
        blue: "#3333FF",
        primary: "#000000",
        mainBackground: "#000000",
      },
    },
  }),
}));

beforeEach(() => {
  currentLanguage = "en";
});

describe("SwithLanguages Component", () => {
  it("should render with the default flag based on the initial language", () => {
    render(<SwithLanguages />);
    const button = screen.getByRole("button", { name: /USA flag/i });
    expect(button).toBeInTheDocument();
  });

  it("should render with the default flag if no language is passed", () => {
    currentLanguage = "";
    render(<SwithLanguages />);
    const button = screen.getByRole("button", { name: /USA flag/i });
    expect(button).toBeInTheDocument();
  });

  it("should open and close the popover on button click and outside click", async () => {
    render(<SwithLanguages />);

    const button = screen.getByRole("button", { name: /USA flag/i });
    fireEvent.click(button);

    // Verifica se o Popover abriu
    const popover = screen.getByRole("list");
    expect(popover).toBeInTheDocument();

    fireEvent.keyDown(popover, { key: "Escape" });

    await waitFor(() => {
      expect(popover).not.toBeInTheDocument();
    });
  });

  it("should call changeLanguage with 'en' when English is selected", () => {
    render(<SwithLanguages />);
    const button = screen.getByRole("button", { name: /USA flag/i });
    fireEvent.click(button);

    const englishOption = screen.getByRole("img", { name: /USA flag/i });
    fireEvent.click(englishOption);

    expect(useTranslation().i18n.changeLanguage).toHaveBeenCalledWith("en");
  });

  it("should call changeLanguage with 'ptBr' when Portuguese is selected", () => {
    render(<SwithLanguages />);
    const button = screen.getByRole("button", { name: /USA flag/i });
    fireEvent.click(button);

    const portugueseOption = screen.getByRole("img", {
      name: /Brazil flag/i,
    });
    fireEvent.click(portugueseOption);

    expect(useTranslation().i18n.changeLanguage).toHaveBeenCalledWith("ptBr");
  });

  it("should call changeLanguage with 'es' when Spanish is selected", () => {
    render(<SwithLanguages />);
    const button = screen.getByRole("button", { name: /USA flag/i });
    fireEvent.click(button);

    const spanishOption = screen.getByRole("img", { name: /SPANISH flag/i });
    fireEvent.click(spanishOption);

    expect(useTranslation().i18n.changeLanguage).toHaveBeenCalledWith("es");
  });

  it("should display the correct flag based on the selected language", () => {
    render(<SwithLanguages />);

    // Simula a seleção de português
    const button = screen.getByRole("button", { name: /USA flag/i });
    fireEvent.click(button);

    const portugueseOption = screen.getAllByRole("listitem")[1];
    fireEvent.click(portugueseOption);

    // Verifica se a bandeira do Brasil é exibida
    expect(
      screen.getByRole("img", { name: "Brazil flag" }),
    ).toBeInTheDocument();
  });
});
