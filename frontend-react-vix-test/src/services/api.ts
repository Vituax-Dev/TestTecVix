import axios, { AxiosError } from "axios";

export interface IResponse<T> {
  message: string;
  error: boolean;
  err: unknown;
  data: T;
}

export const baseAuth = () => {
  const signature = import.meta.env.VITE_SIGN_HASH || "";

  return {
    withCredentials: true,
    headers: {
      "x-sign": signature,
    },
  };
};

const retryRequest = async <T>({
  method = "GET",
  url = "",
  data = {},
  params = {},
  timeout = 50000,
  fullEndpoint = "",
} = {}): Promise<IResponse<T>> => {
  try {
    const BASE_URL =
      import.meta.env.VITE_BASE_URL || "http://localhost:3001/api/v1";
    const config = baseAuth();
    const response: { data: T } = await axios({
      ...(timeout && { timeout }),
      method,
      url: fullEndpoint || `${BASE_URL}${url}`,
      data,
      params,
      ...config,
    });

    return { data: response.data, error: false, err: null, message: "" };
  } catch (error) {
    let message = "Unknown error";
    if (error instanceof AxiosError) {
      message = error?.response?.data?.message || error.message;
    }
    return { message, error: true, err: error, data: [] as T };
  }
};

const app = async <T>({
  method = "GET",
  url = "",
  data = {},
  params = {},
  timeout = 80000,
  fullEndpoint = "",
  tryRefetch = false,
} = {}): Promise<IResponse<T>> => {
  try {
    const BASE_URL =
      import.meta.env.VITE_BASE_URL || "http://localhost:3001/api/v1";
    const config = baseAuth();
    const response: { data: T } = await axios({
      ...(timeout && { timeout }),
      method,
      url: fullEndpoint || `${BASE_URL}${url}`,
      data,
      params,
      ...config,
    });

    return { data: response.data, error: false, err: null, message: "" };
  } catch (error) {
    let message = "Unknown error";
    if (error instanceof AxiosError) {
      if (
        error.status === 403 ||
        (error.code === "ECONNABORTED" && error.message.includes("timeout"))
      ) {
        if (tryRefetch) {
          // implementar um log de registros desses erros
          return retryRequest<T>({
            method,
            url,
            data,
            params,
            timeout: timeout * 2 || undefined,
            fullEndpoint,
          });
        }
      }
      message = error?.response?.data?.message || error.message;
    }
    return { message, error: true, err: error, data: [] as T };
  }
};

const get = async <T>({
  url = "",
  data = {},
  params = {},
  timeout = undefined,
  fullEndpoint = "",
  tryRefetch = false,
} = {}) => {
  return app<T>({
    method: "GET",
    url,
    data,
    params,
    timeout,
    fullEndpoint,
    tryRefetch,
  });
};

const remove = async <T>({
  url = "",
  data = {},
  timeout = undefined,
  fullEndpoint = "",
  tryRefetch = false,
}) =>
  app<T>({
    method: "DELETE",
    url,
    data,
    timeout,
    fullEndpoint,
    tryRefetch,
  });

const put = async <T>({
  url = "",
  data = {},
  timeout = undefined,
  fullEndpoint = "",
  tryRefetch = false,
}) => {
  return app<T>({
    method: "PUT",
    url,
    data,
    timeout,
    fullEndpoint,
    tryRefetch,
  });
};

const post = async <T>({
  url = "",
  data = {},
  timeout = undefined,
  fullEndpoint = "",
  tryRefetch = false,
}) =>
  app<T>({
    method: "POST",
    url,
    data,
    timeout,
    fullEndpoint,
    tryRefetch,
  });

export const api = {
  get,
  delete: remove,
  put,
  post,
};
