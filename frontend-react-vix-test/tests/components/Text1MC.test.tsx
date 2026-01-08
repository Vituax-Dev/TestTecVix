import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { TextRob20Font1MC } from "../../src/components/Text1MC";

describe("TextRob20Font1MC Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(
      <TextRob20Font1MC>Testando componente com snapshot</TextRob20Font1MC>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with custom styles passed via sx prop", () => {
    const { container } = render(
      <TextRob20Font1MC sx={{ color: "blue", fontSize: "24px" }}>
        Testando componente com sx customizado
      </TextRob20Font1MC>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
