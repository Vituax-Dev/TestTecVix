import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { TextRob14FontXsB } from "../../src/components/TextXsB";

describe("TextRob14FontXsB Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(
      <TextRob14FontXsB>Testando componente com snapshot</TextRob14FontXsB>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with custom styles passed via sx prop", () => {
    const { container } = render(
      <TextRob14FontXsB sx={{ color: "blue", fontSize: "24px" }}>
        Testando componente com sx customizado
      </TextRob14FontXsB>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
