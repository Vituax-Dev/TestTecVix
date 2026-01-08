import { TAction, TTask } from "../types/VMTypes";

export const checkStatus = (
  statusState: string | null,
  action?: TAction,
  task?: TTask,
) => {
  const isRunning = "RUNNING".includes(statusState?.toUpperCase());
  const isStopped = "STOPPED".includes(statusState?.toUpperCase());
  const isPaused = "PAUSED".includes(statusState?.toUpperCase());
  const isWaiting = statusState === null;

  if (task?.includes("backup")) {
    return {
      isRunning,
      isStopped,
      isPaused,
      isWaiting: false,
    };
  }

  if (!statusState || (action && action !== "finished")) {
    return {
      isRunning: false,
      isStopped: false,
      isPaused: false,
      isWaiting: true,
    };
  }

  return {
    isRunning,
    isStopped,
    isPaused,
    isWaiting,
  };
};
