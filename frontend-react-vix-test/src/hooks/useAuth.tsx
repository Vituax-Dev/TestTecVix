import { useZUserProfile } from "../stores/useZUserProfile";
import { useZGlobalVar } from "../stores/useZGlobalVar";
import { api } from "../services/api";

const REFRESH_TIME_MINUTES = 50;

export const useAuth = () => {
  const { token, setUser } = useZUserProfile();
  const { loginTime, setLoginTime } = useZGlobalVar();

  const shouldRefresh = () => {
    if (!token || !loginTime) return false;
    const now = new Date().getTime();
    const lastLogin = new Date(loginTime).getTime();
    const diffMinutes = (now - lastLogin) / (1000 * 60);
    return diffMinutes >= REFRESH_TIME_MINUTES;
  };

  const refreshToken = async () => {
    const response = await api.post<{ token: string }>({
      url: "/auth/refresh",
      auth: { Authorization: `Bearer ${token}` },
    });

    if (!response.error && response.data?.token) {
      setUser({ token: response.data.token });
      setLoginTime(new Date());
      return response.data.token;
    }
    return token;
  };

  const getAuth = async (force = false) => {
    if (!token) return {};

    if (force || shouldRefresh()) {
      const newToken = await refreshToken();
      return { Authorization: `Bearer ${newToken}` };
    }

    return { Authorization: `Bearer ${token}` };
  };

  return {
    getAuth,
  };
};
