import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { TextRob12Font2Xs } from "../../src/components/Text2Xs";

describe("TextRob12Font2Xs Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(
      <TextRob12Font2Xs>Testando componente com snapshot</TextRob12Font2Xs>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with custom styles passed via sx prop", () => {
    const { container } = render(
      <TextRob12Font2Xs sx={{ color: "blue", fontSize: "24px" }}>
        Testando componente com sx customizado
      </TextRob12Font2Xs>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
