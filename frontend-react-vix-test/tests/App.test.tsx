import React from "react";
import { it, expect, describe, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../src/App";
import "@testing-library/jest-dom/vitest";

vi.mock("../src/stores/useZTheme", () => ({
  useZTheme: () => ({
    theme: { light: { mainBackground: "#FFF" } },
    mode: "light",
  }),
}));

const changeLanguageMock = vi.fn();
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: { changeLanguage: changeLanguageMock },
    t: (key: string) => key,
  }),
  Trans: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("App", () => {
  it("should match snapshot", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("renderscounter button", () => {
    render(<App />);
    const linkElement = screen.getByTestId("count");
    expect(linkElement).toBeInTheDocument();
  });

  it.skip("change language button", () => {
    render(<App />);
    fireEvent.click(screen.getByText(/en/i));
    fireEvent.click(screen.getByTestId("pt-br"));
    fireEvent.click(screen.getByText(/es/i));
    expect(changeLanguageMock).toBeCalledWith("es");
  });

  it("increments count when button is clicked", () => {
    render(<App />);
    const buttonElement = screen.getByTestId("count");
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent("");
  });
});
