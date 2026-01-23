import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

export interface IResponse<T> {
  message: string;
  error: boolean;
  err: unknown;
  data: T;
}

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001/api/v1";
const SIGNATURE = import.meta.env.VITE_SIGN_HASH || "";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    "x-sign": SIGNATURE,
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

const request = async <T>({
  method = "GET",
  url = "",
  data = {},
  auth,
  params,
  timeout = 80000,
  fullEndpoint = "",
}: {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  url?: string;
  data?: any;
  auth?: Record<string, string>;
  params?: any;
  timeout?: number;
  fullEndpoint?: string;
} = {}): Promise<IResponse<T>> => {
  try {
    const response = await apiClient.request<T>({
      method,
      url: fullEndpoint || url,
      data,
      params,
      timeout,
      
      ...(auth ? { headers: auth } : {}),
    });

    return { data: response.data, error: false, err: null, message: "" };
  } catch (error) {
    let message = "Unknown error";
    if (error instanceof AxiosError) {
      message = (error.response?.data as any)?.message || error.message;
    }
    return { message, error: true, err: error, data: [] as T };
  }
};

const get = async <T>(opts: any = {}) => request<T>({ method: "GET", ...opts });
const post = async <T>(opts: any = {}) => request<T>({ method: "POST", ...opts });
const put = async <T>(opts: any = {}) => request<T>({ method: "PUT", ...opts });
const remove = async <T>(opts: any = {}) =>
  request<T>({ method: "DELETE", ...opts });

export const api = {
  get,
  post,
  put,
  delete: remove,
};
