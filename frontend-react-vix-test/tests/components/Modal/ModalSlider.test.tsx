import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { it, expect, describe, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { ModalSlider } from "../../../src/components/Modal/ModalSlider";
// import { useTranslation } from "react-i18next";
// import { useZTheme } from "../../../src/stores/useZTheme";

vi.mock("../../../src/stores/useZTheme", () => ({
  useZTheme: () => ({
    mode: "light",
    theme: {
      light: {
        mainBackground: "#FFFFFF",
        primary: "#000000",
        blue: "#0000FF",
        gray: "#CCCCCC",
        grayLight: "#EEEEEE",
        blueMedium: "#0000CC",
        btnDarkBlue: "#3333FF",
      },
      dark: {
        mainBackground: "#000000",
        primary: "#FFFFFF",
        blue: "#3333FF",
        gray: "#666666",
        grayLight: "#444444",
        blueMedium: "#2222FF",
        btnDarkBlue: "#FFFFFF",
      },
    },
  }),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("ModalSlider Component", () => {
  let handleChangeMock = vi.fn();
  let closeModalMock = vi.fn();

  beforeEach(() => {
    handleChangeMock = vi.fn();
    closeModalMock = vi.fn();
  });

  it("renders correctly with default props", () => {
    render(
      <ModalSlider
        value={5}
        handleChange={handleChangeMock}
        closeModal={closeModalMock}
        min={1}
        max={10}
        step={1}
        posX={100}
        posY={100}
        label="Disk size"
      />,
    );

    expect(screen.getByText("Disk size")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument(); // min value
    expect(screen.getByText("5.5")).toBeInTheDocument(); // mid value
    expect(screen.getByText("10")).toBeInTheDocument(); // max value
  });

  it("updates the slider value on change and displays the correct sum", () => {
    render(
      <ModalSlider
        value={5}
        handleChange={handleChangeMock}
        closeModal={closeModalMock}
      />,
    );

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: 3 } });

    expect(slider).toHaveValue("3");
    expect(screen.getByText("generic.addDisk: 5 + 3 = 8")).toBeInTheDocument(); // Verifica se o texto atualiza
  });

  it("closes the modal when the cancel button is clicked", () => {
    render(
      <ModalSlider
        value={5}
        handleChange={handleChangeMock}
        closeModal={closeModalMock}
      />,
    );

    const cancelButton = screen.getByText("generic.cancel");
    fireEvent.click(cancelButton);

    expect(closeModalMock).toHaveBeenCalled();
  });

  it("calls handleChange with the correct value and closes the modal on save", () => {
    render(
      <ModalSlider
        value={5}
        handleChange={handleChangeMock}
        closeModal={closeModalMock}
      />,
    );

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: 3 } });

    const saveButton = screen.getByText("generic.save");
    fireEvent.click(saveButton);

    expect(handleChangeMock).toHaveBeenCalledWith(8); // 5 + 3
    expect(closeModalMock).toHaveBeenCalled();
  });

  it("displays the label if provided instead of the default text", () => {
    render(
      <ModalSlider
        value={5}
        handleChange={handleChangeMock}
        closeModal={closeModalMock}
        label="Custom Label"
      />,
    );

    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("displays the calculated value if no label is provided", () => {
    render(
      <ModalSlider
        value={3}
        handleChange={handleChangeMock}
        closeModal={closeModalMock}
      />,
    );

    expect(screen.getByText("generic.addDisk: 3 + 0 = 3")).toBeInTheDocument();
  });

  it("positions the modal based on posX and posY", () => {
    render(
      <ModalSlider
        value={5}
        handleChange={handleChangeMock}
        closeModal={closeModalMock}
        posX={100}
        posY={150}
      />,
    );

    const modalContent = screen.getByRole("presentation").firstChild;
    expect(modalContent).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { container } = render(
      <ModalSlider
        value={5}
        handleChange={handleChangeMock}
        closeModal={closeModalMock}
        min={1}
        max={10}
        step={1}
        posX={100}
        posY={100}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
