import { render, screen } from "@testing-library/react";
import React from "react";
import { Contact } from "../../../../../src/pages/Register/components/MainRegisterForm/Contact";
import { describe, expect, it, Mock, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { useZBrandInfo } from "../../../../../src/stores/useZBrandStore";
// import { useZTheme } from "../../../../../src/stores/useZTheme";
// import { useTranslation } from "react-i18next";

vi.mock("../../../../../src/stores/useZTheme", () => ({
  useZTheme: vi.fn(() => ({
    mode: "light",
    theme: {
      light: { btnDarkBlue: "#001F3F", blue: "#0074D9" },
      dark: { btnDarkBlue: "#001F3F", blue: "#0074D9" },
    },
  })),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("../../../../../src/stores/useZBrandStore", () => ({
  useZBrandInfo: vi.fn(() => ({
    brandContact: "https://example.com/contact",
    brandName: "Example Brand",
    brandSite: "https://example.com",
    brandPrivacyPolicy: "https://example.com/privacy",
  })),
}));

describe("Contact Component", () => {
  it("renders with all provided brand links", () => {
    render(
      <Router>
        <Contact />
      </Router>,
    );

    const brandSiteLink = screen.getByRole("link", { name: /Example Brand/i });
    const contactLink = screen.getByRole("link", {
      name: /loginRegister.contact/i,
    });
    const privacyPolicyLink = screen.getByRole("link", {
      name: /loginRegister.privacyAndPolicy/i,
    });

    expect(brandSiteLink).toHaveAttribute("href", "https://example.com");
    expect(contactLink).toHaveAttribute("href", "https://example.com/contact");
    expect(privacyPolicyLink).toHaveAttribute(
      "href",
      "https://example.com/privacy",
    );
  });

  it("renders default '/' href when brand links are not provided", () => {
    (useZBrandInfo as unknown as Mock).mockReturnValueOnce({
      brandContact: null,
      brandName: "Example Brand",
      brandSite: null,
      brandPrivacyPolicy: null,
    });

    render(
      <Router>
        <Contact />
      </Router>,
    );

    const brandSiteLink = screen.getByRole("link", { name: /Example Brand/i });
    const contactLink = screen.getByRole("link", {
      name: /loginRegister.contact/i,
    });
    const privacyPolicyLink = screen.getByRole("link", {
      name: /loginRegister.privacyAndPolicy/i,
    });

    expect(brandSiteLink).toHaveAttribute("href", "/");
    expect(contactLink).toHaveAttribute("href", "/");
    expect(privacyPolicyLink).toHaveAttribute("href", "/");
  });
});
