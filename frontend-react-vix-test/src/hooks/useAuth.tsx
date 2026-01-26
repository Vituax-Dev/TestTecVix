import { useZUserProfile } from "../stores/useZUserProfile";

export const useAuth = () => {
  const { token } = useZUserProfile();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getAuth = async (_force = false) => {

    return { Authorization: `Bearer ${token}` };
  };

  return {
    getAuth,
  };
};
