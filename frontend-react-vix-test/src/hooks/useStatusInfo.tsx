import { useTranslation } from "react-i18next";
import { useZTheme } from "../stores/useZTheme";
import { checkStatus } from "../utils/checkStatus";
import { IVMCreatedResponse, taskMock } from "../types/VMTypes";

export const useStatusInfo = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  const getStatus = (vm: IVMCreatedResponse) => {
    if (!vm)
      return {
        text: t("myVMs.inactive"),
        color: theme[mode].red,
        background: theme[mode].lightRed,
        isWaiting: false,
        isRunning: false,
        isPaused: false,
        isStopped: false,
      };

    const statusObj = checkStatus(vm.status, taskMock?.action, taskMock?.task);

    switch (true) {
      case statusObj.isWaiting:
        return {
          text: t("myVMs.waiting"),
          color: theme[mode].btnLightText,
          background: theme[mode].blueLight,
          isWaiting: true,
          isRunning: false,
          isPaused: false,
          isStopped: false,
        };

      case statusObj.isRunning:
        return {
          text: t("myVMs.active"),
          color: theme[mode].green,
          background: theme[mode].greenLight,
          isWaiting: false,
          isRunning: true,
          isPaused: false,
          isStopped: false,
        };

      case statusObj.isPaused:
        return {
          text: t("myVMs.paused"),
          color: theme[mode].dark,
          background: theme[mode].tertiary,
          isWaiting: false,
          isRunning: false,
          isPaused: true,
          isStopped: false,
        };

      case statusObj.isStopped:
        return {
          text: t("myVMs.inactive"),
          color: theme[mode].red,
          background: theme[mode].lightRed,
          isWaiting: false,
          isRunning: false,
          isPaused: false,
          isStopped: true,
        };

      default:
        return {
          text: t("myVMs.inactive"),
          color: theme[mode].red,
          background: theme[mode].lightRed,
          isWaiting: false,
          isRunning: false,
          isPaused: false,
          isStopped: false,
        };
    }
  };

  const statusHashMap = {
    null: t("myVMs.waiting"),
    RUNNING: t("myVMs.active"),
    PAUSED: t("home.pause"),
    STOPPED: t("home.stop"),
  };
  return { getStatus, statusHashMap };
};
