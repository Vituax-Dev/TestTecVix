import { PrivatePage } from "../auth/PrivatePage";
import { VirtualMachinePage } from "../pages/VirtualMachine";

export const VirtualMachineRouter = {
  path: "/virtual-machine",
  element: (
    <PrivatePage onlyManagerOrAdmin>
      <VirtualMachinePage />,
    </PrivatePage>
  ),
};
