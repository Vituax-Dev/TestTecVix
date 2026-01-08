import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { TextRob14Font1Xs } from "../../src/components/Text1Xs";

describe("TextRob32Font1L Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(
      <TextRob14Font1Xs>Testando componente com snapshot</TextRob14Font1Xs>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with custom styles passed via sx prop", () => {
    const { container } = render(
      <TextRob14Font1Xs sx={{ color: "blue", fontSize: "24px" }}>
        Testando componente com sx customizado
      </TextRob14Font1Xs>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
