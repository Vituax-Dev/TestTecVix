import React from "react";
import { usePermissionGuard } from "../hooks/usePermissions";
import { Alert, Typography } from "@mui/material";

interface PermissionGuardProps {
  children: React.ReactNode;
  action: "read" | "create" | "update" | "delete";
  fallback?: React.ReactNode;
  adminOnly?: boolean;
  managerOrAdminOnly?: boolean;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  action,
  fallback,
  adminOnly = false,
  managerOrAdminOnly = false,
}) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isManagerOrAdmin,
    withPermission,
    withAdminPermission,
    withManagerOrAdminPermission,
  } = usePermissionGuard();

  // Verificação de permissões específicas
  if (adminOnly) {
    return <>{withAdminPermission(children) || fallback}</>;
  }

  if (managerOrAdminOnly) {
    return <>{withManagerOrAdminPermission(children) || fallback}</>;
  }

  // Verificação de permissões por ação
  return <>{withPermission(action, children) || fallback}</>;
};

// Componente para mostrar mensagem de acesso negado
export const AccessDenied: React.FC<{ message?: string }> = ({
  message = "Você não possui permissão para realizar esta ação.",
}) => {
  return (
    <Alert severity="warning" sx={{ mt: 2 }}>
      <Typography variant="body2">{message}</Typography>
    </Alert>
  );
};

// Componente wrapper para botões condicionais
interface ConditionalButtonProps {
  children: React.ReactNode;
  action: "create" | "update" | "delete";
  adminOnly?: boolean;
  managerOrAdminOnly?: boolean;
}

export const ConditionalButton: React.FC<ConditionalButtonProps> = ({
  children,
  action,
  adminOnly = false,
  managerOrAdminOnly = false,
}) => {
  return (
    <PermissionGuard
      action={action}
      adminOnly={adminOnly}
      managerOrAdminOnly={managerOrAdminOnly}
    >
      {children}
    </PermissionGuard>
  );
};