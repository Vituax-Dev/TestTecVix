import { useZBrandInfo } from "./useZBrandStore";
import { useZGlobalVar } from "./useZGlobalVar";
import { useZMyVMsList } from "./useZMyVMsList";
import { useZUserProfile } from "./useZUserProfile";
import { useZVM } from "./useZVM";

export const useZResetAllStates = () => {
  const { resetAll: resetAllStates } = useZUserProfile();
  const { resetAll: resetAllStatesBrand } = useZBrandInfo();
  const { resetAll: resetAllStatesGlobal } = useZGlobalVar();
  const { resetAll: resetAllStatesMyVMs } = useZMyVMsList();
  const { resetAll: resetAllStatesVM } = useZVM();

  return {
    resetAllStates: () => {
      resetAllStates();
      resetAllStatesBrand();
      resetAllStatesGlobal();
      resetAllStatesMyVMs();
      resetAllStatesVM();
    },
  };
};
