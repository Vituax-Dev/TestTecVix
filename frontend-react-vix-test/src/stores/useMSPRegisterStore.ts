import { create } from "zustand";

interface MSPData {
  // Etapa 1 - Informações Básicas
  brandName: string;
  location: string;
  cnpj: string;
  corporateName: string;
  stateRegistration: string;
  municipalRegistration: string;
  phone: string;
  setorName: string;
  email: string;
  minConsumption: string;
  discountPercentage: string;

  // Etapa 2 - Endereço e Contrato
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  contractNumber: string;
  isPoc: boolean;
}

interface MSPRegisterState {
  currentStep: number;
  mspData: MSPData;
  isSubmitting: boolean;
  setCurrentStep: (step: number) => void;
  updateMSPData: (data: Partial<MSPData>) => void;
  setIsSubmitting: (loading: boolean) => void;
  resetForm: () => void;
  canProceedToNextStep: () => boolean;
}

const initialMSPData: MSPData = {
  brandName: "",
  location: "",
  cnpj: "",
  corporateName: "",
  stateRegistration: "",
  municipalRegistration: "",
  phone: "",
  setorName: "",
  email: "",
  minConsumption: "",
  discountPercentage: "",
  cep: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  contractNumber: "",
  isPoc: false,
};

export const useMSPRegisterStore = create<MSPRegisterState>((set, get) => ({
  currentStep: 1,
  mspData: initialMSPData,
  isSubmitting: false,

  setCurrentStep: (step: number) =>
    set(() => ({ currentStep: step })),

  updateMSPData: (data: Partial<MSPData>) =>
    set((state) => ({
      mspData: { ...state.mspData, ...data },
    })),

  setIsSubmitting: (loading: boolean) =>
    set(() => ({ isSubmitting: loading })),

  resetForm: () =>
    set(() => ({
      currentStep: 1,
      mspData: initialMSPData,
      isSubmitting: false,
    })),

  canProceedToNextStep: () => {
    const { currentStep, mspData } = get();
    
    if (currentStep === 1) {
      return !!(
        mspData.brandName &&
        mspData.location &&
        mspData.cnpj &&
        mspData.phone &&
        mspData.setorName &&
        mspData.email
      );
    }
    
    if (currentStep === 2) {
      return !!(
        mspData.cep &&
        mspData.street &&
        mspData.number &&
        mspData.neighborhood &&
        mspData.city &&
        mspData.state &&
        mspData.contractNumber
      );
    }
    
    return false;
  },
}));