import { LoginSkeleton } from "../components/Skeletons/LoginSkeleton";
import { useLoadingApp } from "../hooks/useLoadingApp";

interface IProps {
  children: React.ReactNode;
  skeleton?: boolean;
  notLoginPage?: boolean;
}
export const LoadingApp = ({ children, notLoginPage = false }: IProps) => {
  const { loading } = useLoadingApp(notLoginPage);

  if (loading) {
    return <LoginSkeleton />;
  }

  return <>{children}</>;
};
