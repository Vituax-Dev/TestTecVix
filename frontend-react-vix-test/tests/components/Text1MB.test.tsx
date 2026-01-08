import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { TextRob20Font1MB } from "../../src/components/Text1MB";

describe("TextRob20Font1MB Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(
      <TextRob20Font1MB>Testando componente com snapshot</TextRob20Font1MB>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with custom styles passed via sx prop", () => {
    const { container } = render(
      <TextRob20Font1MB sx={{ color: "blue", fontSize: "24px" }}>
        Testando componente com sx customizado
      </TextRob20Font1MB>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
