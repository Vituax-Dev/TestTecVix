import { render, screen } from "@testing-library/react";
import React from "react";
import { Contact } from "../../../../../src/pages/Login/components/MainLoginForm/Contact";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe, vi, beforeEach, Mock, afterAll } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { useZBrandInfo } from "../../../../../src/stores/useZBrandStore";
// import { useZTheme } from "../../../../../src/stores/useZTheme";
// import { useTranslation } from "react-i18next";

vi.mock("../../../../../src/stores/useZTheme", () => ({
  useZTheme: () => ({
    mode: "light",
    theme: {
      light: { btnDarkBlue: "#0000FF", blue: "#ADD8E6" },
      dark: { btnDarkBlue: "#0000FF", blue: "#ADD8E6" },
    },
  }),
}));

vi.mock("../../../../../src/stores/useZBrandStore", () => ({
  useZBrandInfo: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations = {
        "loginRegister.contact": "Contact Us",
        "loginRegister.privacyAndPolicy": "Privacy Policy",
      };
      return translations[key] || key;
    },
  }),
}));

describe("Contact Component", () => {
  const brandMock = {
    brandContact: "https://contact.example.com",
    brandName: "ExampleBrand",
    brandSite: "https://example.com",
    brandPrivacyPolicy: "https://privacy.example.com",
    btnDarkBlue: "#0000FF",
    blue: "#ADD8E6",
  };

  beforeEach(() => {
    (useZBrandInfo as unknown as Mock).mockReturnValue(brandMock);
  });

  afterAll(() => {
    (useZBrandInfo as unknown as Mock).mockRestore();
  });

  const renderComponent = () =>
    render(
      <Router>
        <Contact />
      </Router>,
    );

  it("renders brand name link with correct URL and styling", () => {
    renderComponent();
    const brandLink = screen.getByText(brandMock.brandName);
    expect(brandLink).toBeInTheDocument();
    expect(brandLink.closest("a")).toHaveAttribute("href", brandMock.brandSite);
    expect(brandLink.closest("a")).toHaveAttribute("target", "_blank");
    expect(brandLink).toHaveStyle(`color: ${brandMock.btnDarkBlue}`);
  });

  it("renders contact link with correct text and URL", () => {
    renderComponent();
    const contactLink = screen.getByText("Contact Us");
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.closest("a")).toHaveAttribute(
      "href",
      brandMock.brandContact,
    );
    expect(contactLink.closest("a")).toHaveAttribute("target", "_blank");
  });

  it("renders privacy policy link with correct text and URL", () => {
    renderComponent();
    const privacyLink = screen.getByText("Privacy Policy");
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink.closest("a")).toHaveAttribute(
      "href",
      brandMock.brandPrivacyPolicy,
    );
    expect(privacyLink.closest("a")).toHaveAttribute("target", "_blank");
  });

  it("uses default links if brand information is missing", () => {
    (useZBrandInfo as unknown as Mock).mockReturnValueOnce({
      brandContact: "",
      brandName: "",
      brandSite: "",
      brandPrivacyPolicy: "",
    });
    renderComponent();

    const defaultLinks = screen.getAllByRole("link");
    expect(defaultLinks[0]).toHaveAttribute("href", "/");
    expect(defaultLinks[1]).toHaveAttribute("href", "/");
    expect(defaultLinks[2]).toHaveAttribute("href", "/");
  });
});
