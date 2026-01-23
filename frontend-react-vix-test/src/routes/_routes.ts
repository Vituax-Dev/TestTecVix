import { DefaultRouter } from "./DefaultRouter";
import { HomeRouter } from "./HomeRoute";
import { MyVMsRouter } from "./MyVMsRouter";
import { VirtualMachineRouter } from "./VirtualMachineRouter";
import { MSPRegisterRouter } from "./MSPRegisterRouter";
import { LoginRouter } from "./LoginRouter";
import { WhiteLabelRouter } from "./WhiteLabelRouter";
import { NotFoundRouter } from "./NotFoundRouter";

export const mainRoutes = [
  DefaultRouter,
  HomeRouter,
  LoginRouter,
  VirtualMachineRouter,
  MyVMsRouter,
  MSPRegisterRouter,
  WhiteLabelRouter,
  NotFoundRouter, 
];
