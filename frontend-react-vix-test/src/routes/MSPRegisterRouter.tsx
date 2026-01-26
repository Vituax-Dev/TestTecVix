import { PrivatePage } from "../auth/PrivatePage";
import { MSPRegisterPage } from "../pages/MSPRegister";
import { MSPCreatePage } from "../pages/MSPRegister/MSPCreatePage";

export const MSPRegisterRouter = {
  path: "/msp-register",
  element: (
    <PrivatePage>
      <MSPRegisterPage />
    </PrivatePage>
  ),
};

export const MSPCreateRouter = {
  path: "/msp-register/create",
  element: (
    <PrivatePage>
      <MSPCreatePage />
    </PrivatePage>
  ),
};
