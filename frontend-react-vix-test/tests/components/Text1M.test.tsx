import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { TextRob20Font1M } from "../../src/components/Text1M";

describe("TextRob20Font1M Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(
      <TextRob20Font1M>Testando componente com snapshot</TextRob20Font1M>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with custom styles passed via sx prop", () => {
    const { container } = render(
      <TextRob20Font1M sx={{ color: "blue", fontSize: "24px" }}>
        Testando componente com sx customizado
      </TextRob20Font1M>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
