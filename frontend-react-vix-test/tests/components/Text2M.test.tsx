import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { TextRob18Font2M } from "../../src/components/Text2M";

describe("TextRob18Font2M Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(
      <TextRob18Font2M>Testando componente com snapshot</TextRob18Font2M>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with custom styles passed via sx prop", () => {
    const { container } = render(
      <TextRob18Font2M sx={{ color: "blue", fontSize: "24px" }}>
        Testando componente com sx customizado
      </TextRob18Font2M>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
