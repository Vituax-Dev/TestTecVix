import { useMemo } from "react";
import { useZUserProfile, TRole } from "../stores/useZUserProfile";

export type PermissionAction = "read" | "create" | "update" | "delete";

interface PermissionConfig {
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

const PERMISSIONS: Record<TRole, PermissionConfig> = {
  member: {
    read: true,
    create: false,
    update: false,
    delete: false,
  },
  manager: {
    read: true,
    create: true,
    update: true,
    delete: false,
  },
  admin: {
    read: true,
    create: true,
    update: true,
    delete: true,
  },
};

export const usePermissions = () => {
  const { role } = useZUserProfile();

  const hasPermission = useMemo(() => {
    return (action: PermissionAction): boolean => {
      if (!role) return false;
      return PERMISSIONS[role]?.[action] ?? false;
    };
  }, [role]);

  const canRead = useMemo(() => hasPermission("read"), [hasPermission]);
  const canCreate = useMemo(() => hasPermission("create"), [hasPermission]);
  const canUpdate = useMemo(() => hasPermission("update"), [hasPermission]);
  const canDelete = useMemo(() => hasPermission("delete"), [hasPermission]);

  const isAdmin = useMemo(() => role === "admin", [role]);
  const isManager = useMemo(() => role === "manager", [role]);
  const isMember = useMemo(() => role === "member", [role]);
  const isManagerOrAdmin = useMemo(() => role === "admin" || role === "manager", [role]);

  return {
    hasPermission,
    canRead,
    canCreate,
    canUpdate,
    canDelete,
    isAdmin,
    isManager,
    isMember,
    isManagerOrAdmin,
    role,
  };
};

// Hook para controle de UI baseado em permissões
export const usePermissionGuard = () => {
  const permissions = usePermissions();

  const withPermission = (action: PermissionAction, component: React.ReactNode): React.ReactNode => {
    return permissions.hasPermission(action) ? component : null;
  };

  const withAdminPermission = (component: React.ReactNode): React.ReactNode => {
    return permissions.isAdmin ? component : null;
  };

  const withManagerOrAdminPermission = (component: React.ReactNode): React.ReactNode => {
    return permissions.isManagerOrAdmin ? component : null;
  };

  return {
    ...permissions,
    withPermission,
    withAdminPermission,
    withManagerOrAdminPermission,
  };
};