import { DefaultRouter } from "./DefaultRouter";
import { HomeRouter } from "./HomeRoute";
import { MyVMsRouter } from "./MyVMsRouter";
import { VirtualMachineRouter } from "./VirtualMachineRouter";
import { MSPRegisterRouter } from "./MSPRegisterRouter";
import { LoginRouter } from "./LoginRouter";
import { WhiteLabelRouter } from "./WhiteLabelRouter";
import { NotFoundRouter } from "./NotFoundRouter";

export const mainRoutes = [
  // Rota de login (pública)
  LoginRouter,
  
  // Rota raiz "/" - Redireciona para /home ou /login baseado na autenticação
  DefaultRouter,
  
  // Rota /home - Home (protegida)
  HomeRouter,
  
  // Outras rotas protegidas específicas
  VirtualMachineRouter,
  MyVMsRouter,
  MSPRegisterRouter,
  WhiteLabelRouter,
  
  // 404 catch-all - DEVE ser a última rota
  NotFoundRouter,
];