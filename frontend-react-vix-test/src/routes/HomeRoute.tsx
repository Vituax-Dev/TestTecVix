import { PrivatePage } from "../auth/PrivatePage";
import { HomePage } from "../pages/Home";

export const HomeRouter = {
  path: "/home",
  element: (
    <PrivatePage>
      <HomePage />
    </PrivatePage>
  ),
};