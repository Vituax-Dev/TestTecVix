import { PrivatePage } from "../auth/PrivatePage";
import { ColaboratorRegister } from "../pages/ColaboratorRegister";

export const ColaboratorRegisterRouter = {
  path: "/colaborator-register",
  element: (
    <PrivatePage>
      <ColaboratorRegister />
    </PrivatePage>
  ),
};
