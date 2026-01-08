import { render } from "@testing-library/react";
import React from "react";
import { Testemonials } from "../../../../../src/pages/Login/components/Testemonials";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import "swiper/css"; // Necessário para aplicar o estilo do Swiper

vi.mock("../../../../../src/stores/useZTheme", () => ({
  useZTheme: () => ({
    mode: "light",
    theme: {
      light: {
        blue: "#0000FF",
        mainBackground: "#FFFFFF",
        blueDark: "#0000CC",
      },
      dark: {
        blue: "#0000FF",
        mainBackground: "#000000",
        blueDark: "#0000CC",
      },
    },
  }),
}));

describe("Testemonials Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(<Testemonials />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
