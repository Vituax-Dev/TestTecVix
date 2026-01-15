import { DefaultRouter } from "./DefaultRouter";
import { HomeRouter } from "./HomeRouter";
import { MyVMsRouter } from "./MyVMsRouter";
import { VirtualMachineRouter } from "./VirtualMachineRouter";
import { MSPRegisterRouter } from "./MSPRegisterRouter";
import { RegisterRouter } from "./RegisterRouter";
import { LoginRouter } from "./LoginRouter";
import { WhiteLabelRouter } from "./WhiteLabelRouter";
import { ColaboratorRegisterRouter } from "./ColaboratorRegisterRouter";

export const mainRoutes = [
  DefaultRouter,
  HomeRouter,
  LoginRouter, // Descomentar para renderizar o login
  RegisterRouter, // Descomentar para renderizar o register
  VirtualMachineRouter,
  MyVMsRouter,
  MSPRegisterRouter,
  WhiteLabelRouter,
  ColaboratorRegisterRouter,
];
