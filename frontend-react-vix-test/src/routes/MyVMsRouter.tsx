import { PrivatePage } from "../auth/PrivatePage";
import { MyVMsPage } from "../pages/MyVMs";

export const MyVMsRouter = {
  path: "/my-virtual-machines",
  element: (
    <PrivatePage>
      <MyVMsPage />,
    </PrivatePage>
  ),
};
