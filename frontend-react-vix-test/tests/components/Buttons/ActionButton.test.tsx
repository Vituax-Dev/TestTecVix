import { render } from "@testing-library/react";
import React from "react";
import { it, expect, describe } from "vitest";
import "@testing-library/jest-dom/vitest";
import { ActionButton } from "../../../src/components/Buttons/ActionButton";
import { SettingsIcon } from "../../../src/icons/SettingsIcon.tsx";

describe("components/Buttons/ActionButton", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <ActionButton
        text="Testing Component"
        icon={<SettingsIcon />}
        backgroundColor="blue"
        children={<p>testing</p>}
        mode="dark"
        className="test-class"
        hasShadow={true}
        key={"test-key"}
        onClick={() => {}}
        sx={{}}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
