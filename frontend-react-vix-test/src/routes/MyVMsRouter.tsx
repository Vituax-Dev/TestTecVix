import { PrivatePage } from "../auth/PrivatePage";
import { MyVMsPage } from "../pages/MyVMs";

export const MyVMsRouter = {
  path: "/my-vms",
  element: (
    <PrivatePage>
      <MyVMsPage />
    </PrivatePage>
  ),
};