import React from "react";
import { it, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import { HeaderMobile } from "../../../src/components/HeaderMobile/HeaderMobile";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

describe("components/HeaderMobile/HeaderMobile", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <Router>
        <HeaderMobile title="Test Header" />
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });
});
