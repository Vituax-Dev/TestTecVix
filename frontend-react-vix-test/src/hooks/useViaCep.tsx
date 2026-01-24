import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface IViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

interface IAddressData {
  street: string;
  district: string;
  city: string;
  state: string;
  cityCode: string;
}

export const useViaCep = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const formatCep = (cep: string): string => {
    // Remove tudo que não é número
    return cep.replace(/\D/g, "");
  };

  const isValidCep = (cep: string): boolean => {
    const cleanCep = formatCep(cep);
    return cleanCep.length === 8;
  };

  const fetchAddressByCep = async (cep: string): Promise<IAddressData | null> => {
    const cleanCep = formatCep(cep);

    if (!isValidCep(cleanCep)) {
      toast.error(t("mspRegister.invalidCep") || "CEP inválido");
      return null;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data: IViaCepResponse = await response.json();

      if (data.erro) {
        toast.error(t("mspRegister.cepNotFound") || "CEP não encontrado");
        return null;
      }

      return {
        street: data.logradouro || "",
        district: data.bairro || "",
        city: data.localidade || "",
        state: data.uf || "",
        cityCode: data.ibge || "",
      };
    } catch {
      toast.error(t("mspRegister.cepError") || "Erro ao buscar CEP");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    fetchAddressByCep,
    isValidCep,
    formatCep,
  };
};
