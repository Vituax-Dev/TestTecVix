import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React, { useState } from "react";
import { RegisterForm } from "../../../../../src/pages/Register/components/MainRegisterForm/RegisterForm";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
// import { useTranslation } from "react-i18next";
// import { useZTheme } from "../../../../../src/stores/useZTheme";

vi.mock("../../../../../src/stores/useZTheme", () => ({
  useZTheme: vi.fn(() => ({
    mode: "light",
    theme: {
      light: { dark: "#000000", blue: "#0074D9" },
      dark: { dark: "#FFFFFF", blue: "#001F3F" },
    },
  })),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("RegisterForm Component", () => {
  const setup = () => {
    const TestWrapper = () => {
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [email, setEmail] = useState("");

      return (
        <RegisterForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          email={email}
          setEmail={setEmail}
        />
      );
    };

    render(<TestWrapper />);
  };

  it("renders form fields correctly", () => {
    setup();

    expect(
      screen.getByLabelText(/loginRegister.username/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/loginRegister.email/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/loginRegister.password/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/loginRegister.confirmPassword/i),
    ).toBeInTheDocument();
  });

  it("displays email validation error on blur when email is invalid", () => {
    setup();

    const emailInput = screen.getByLabelText(/loginRegister.email/i);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);

    expect(screen.getByText(/loginRegister.invalidEmail/i)).toBeInTheDocument();
  });

  it("does not display email validation error when email is valid", async () => {
    setup();

    const emailInput = screen.getByLabelText(/loginRegister.email/i);
    fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
    fireEvent.blur(emailInput);

    const passwordInput = screen.getByLabelText(/loginRegister.password/i);
    fireEvent.click(passwordInput);

    await waitFor(() => {
      expect(
        screen.queryByText(/loginRegister.invalidEmail/i),
      ).not.toBeInTheDocument();
    });
  });

  it("displays password mismatch error on blur when passwords do not match", async () => {
    setup();

    const passwordInput = screen.getByLabelText(/loginRegister.password/i);
    const confirmPasswordInput = screen.getByLabelText(
      /loginRegister.confirmPassword/i,
    );

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "differentPassword" },
    });
    fireEvent.blur(confirmPasswordInput);

    await waitFor(() => {
      expect(
        screen.getByText(/loginRegister.passwordMismatch/i),
      ).toBeInTheDocument();
    });
  });

  it("does not display password mismatch error when passwords match", () => {
    setup();

    const passwordInput = screen.getByLabelText(/loginRegister.password/i);
    const confirmPasswordInput = screen.getByLabelText(
      /loginRegister.confirmPassword/i,
    );

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.blur(confirmPasswordInput);

    expect(
      screen.queryByText(/loginRegister.passwordMismatch/i),
    ).not.toBeInTheDocument();
  });
});
