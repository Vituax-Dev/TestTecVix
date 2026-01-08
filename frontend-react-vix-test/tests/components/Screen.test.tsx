import React from "react";
import { it, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import { Screen } from "../../src/components/Screen";
import "@testing-library/jest-dom/vitest";
import { Searchbar } from "../../src/pages/Home/components/Header/Searchbar";

describe("Screen component", () => {
  it("should match snapshot", () => {
    const { container } = render(<Screen isLoading={true} />);
    expect(container).toMatchSnapshot();
  });
});

// Tests Searchbar component:

it("renders Searchbar correctly", () => {
  const { container } = render(<Searchbar />);
  expect(container).toMatchSnapshot();
});
