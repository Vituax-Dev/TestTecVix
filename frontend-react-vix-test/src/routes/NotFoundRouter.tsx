import { PrivatePage } from "../auth/PrivatePage";

export const NotFoundRouter = {
  path: "*",
  element: (
    <PrivatePage>
      <div className="text-3xl m-auto h-screen w-screen text-center flex justify-center items-center">
        404 - Página não encontrada
      </div>
    </PrivatePage>
  ),
};
