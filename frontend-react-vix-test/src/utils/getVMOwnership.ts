import img from "../assets/Vituax_LOGO_Versao_Principal_RBG.png";
import { IVMCreatedResponse } from "../types/VMTypes";

export const getVMOwnership = (vm: IVMCreatedResponse | null) => {
  if (!vm)
    return {
      id: 0,
      name: "",
      logo: "",
    };
  if (vm.idCompany && vm.company)
    return {
      name: vm.company.companyName,
      id: vm.idCompany,
      logo: vm.company.companyLogo,
    };

  if (vm.idBrandMaster && vm.brandMaster)
    return {
      name: vm.brandMaster.brandName,
      id: vm.idBrandMaster,
      logo: vm.brandMaster.brandLogo,
    };

  return {
    id: 0,
    name: "Vituax",
    logo: img,
  };
};
