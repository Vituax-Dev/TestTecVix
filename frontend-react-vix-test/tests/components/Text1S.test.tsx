import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { TextRob16Font1S } from "../../src/components/Text1S";

describe("TextRob32Font1L Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(
      <TextRob16Font1S>Testando componente com snapshot</TextRob16Font1S>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with custom styles passed via sx prop", () => {
    const { container } = render(
      <TextRob16Font1S sx={{ color: "blue", fontSize: "24px" }}>
        Testando componente com sx customizado
      </TextRob16Font1S>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
