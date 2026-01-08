import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { TextRob32Font1L } from "../../src/components/Text1L";

describe("TextRob32Font1L Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(
      <TextRob32Font1L>Testando componente com snapshot</TextRob32Font1L>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with custom styles passed via sx prop", () => {
    const { container } = render(
      <TextRob32Font1L sx={{ color: "blue", fontSize: "24px" }}>
        Testando componente com sx customizado
      </TextRob32Font1L>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
