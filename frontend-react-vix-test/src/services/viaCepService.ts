import axios from "axios";

export interface IViaCepResponse {
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

export interface IAddressData {
  cep: string;
  street: string;
  district: string;
  city: string;
  state: string;
  cityCode: string;
}

export const fetchAddressByCep = async (cep: string): Promise<IAddressData | null> => {
  try {
    const cleanCep = cep.replace(/\D/g, "");
    
    if (cleanCep.length !== 8) {
      return null;
    }

    const response = await axios.get<IViaCepResponse>(
      `https://viacep.com.br/ws/${cleanCep}/json/`
    );

    if (response.data.erro) {  
      console.error('Error fetching cep:', response.data.erro)
      return null;
    }

    return {
      cep: response.data.cep,
      street: response.data.logradouro,
      district: response.data.bairro,
      city: response.data.localidade,
      state: response.data.uf,
      cityCode: response.data.ibge,
    };
  } catch (error) {
    console.error("Error fetching address from ViaCEP:", error);
    return null;
  }
};
