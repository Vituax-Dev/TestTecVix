import { PrivatePage } from "../auth/PrivatePage";
import { VirtualMachinePage } from "../pages/VirtualMachine";

export const VirtualMachineRouter = {
  path: "/create-vm",
  element: (
    <PrivatePage onlyManagerOrAdmin>
      <VirtualMachinePage />
    </PrivatePage>
  ),
};