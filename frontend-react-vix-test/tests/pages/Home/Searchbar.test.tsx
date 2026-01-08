import React from "react";
import { it, expect, describe, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Searchbar } from "../../../src/pages/Home/components/Header/Searchbar";
import "@testing-library/jest-dom/vitest";
import "../../mocks/i18nForTests";

// Mock do i18next para internacionalização nos testes
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Retorna a chave de tradução
  }),
  initReactI18next: { type: "3rdParty", init: () => {} }, // Mock de initReactI18next
}));

describe("Searchbar Component", () => {
  it("should update the search input when typing", () => {
    const { getByPlaceholderText } = render(<Searchbar />);

    // Ajuste o placeholder para o valor internacionalizado ("home.search")
    const input = getByPlaceholderText("home.search") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Test search" } });

    expect(input.value).toBe("Test search");
  });

  it.skip("should call goSearch when search icon is clicked", () => {
    // Mock do console.log
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const { getByRole } = render(<Searchbar />);
    const searchButton = getByRole("button");
    fireEvent.click(searchButton);

    // Verifique se o console.log foi chamado
    expect(logSpy).toHaveBeenCalledWith("", "search");

    // Restaure o comportamento original de console.log
    logSpy.mockRestore();
  });

  it.skip("should call goSearch after 1 second when typing", () => {
    vi.useFakeTimers(); // Ativa os timers falsos para controlar o tempo
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const { getByPlaceholderText } = render(<Searchbar />);

    // Usar o placeholder internacionalizado
    const input = getByPlaceholderText("home.search") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Delayed search" } });

    vi.advanceTimersByTime(1000); // Avança o tempo em 1 segundo

    // Verifica se console.log foi chamado após 1 segundo
    expect(logSpy).toHaveBeenCalledWith("Delayed search", "search");

    logSpy.mockRestore();
    vi.useRealTimers(); // Restaura os timers reais
  });
});
