import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { TextRob28Font2L } from "../../src/components/Text2L";

describe("TextRob28Font2L Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(
      <TextRob28Font2L>Testando componente com snapshot</TextRob28Font2L>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with custom styles passed via sx prop", () => {
    const { container } = render(
      <TextRob28Font2L sx={{ color: "blue", fontSize: "24px" }}>
        Testando componente com sx customizado
      </TextRob28Font2L>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
