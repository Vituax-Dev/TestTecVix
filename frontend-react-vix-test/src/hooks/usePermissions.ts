import { useZUserProfile } from "../stores/useZUserProfile";

// Types for entities that need permission checks
interface VMEntity {
  idBrandMaster?: number | null;
}

interface MSPEntity {
  idBrandMaster: number;
}

interface UserEntity {
  idUser: string;
  idBrandMaster?: number | null;
}

/**
 * Hook that provides permission checking functions based on the logged user's role and company.
 *
 * Permission Matrix:
 * - member: Read only (cannot create, edit, or delete)
 * - manager: Can read, create, and edit (cannot delete)
 * - admin: Full access (read, create, edit, delete)
 *
 * Company Rules:
 * - Vituax users (idBrand: null) can manage all companies
 * - MSP users can only manage their own company
 */
export const usePermissions = () => {
  const {
    role,
    idBrand: userBrandId,
    idUser: loggedUserId,
  } = useZUserProfile();

  // Check if user is from Vituax (no brand assigned)
  const isVituaxUser = userBrandId === null;

  // Check role helpers
  const isAdmin = role === "admin";
  const isManager = role === "manager";
  const isMember = role === "member";
  const isAdminOrManager = isAdmin || isManager;

  // ============================================
  // VM PERMISSIONS
  // ============================================

  /**
   * Check if user can create VMs
   * Rules: Admin/Manager can create (member cannot)
   */
  const canCreateVM = (): boolean => {
    return isAdminOrManager;
  };

  /**
   * Check if user can control a VM (edit name, start, stop)
   * Rules:
   * - Member cannot control any VM
   * - Admin/Manager Vituax can control any VM
   * - Admin/Manager MSP can only control VMs from their company
   */
  const canControlVM = (vm: VMEntity): boolean => {
    if (!isAdminOrManager) return false;

    // Vituax admin/manager can control any VM
    if (isVituaxUser) return true;

    // MSP admin/manager can only control VMs from their company
    return vm.idBrandMaster === userBrandId;
  };

  /**
   * Check if user can delete a VM
   * Rules:
   * - Only admins can delete
   * - Vituax admin can delete any VM
   * - MSP admin can only delete VMs from their company
   */
  const canDeleteVM = (vm: VMEntity): boolean => {
    if (!isAdmin) return false;

    // Vituax admin can delete any VM
    if (isVituaxUser) return true;

    // MSP admin can only delete VMs from their company
    return vm.idBrandMaster === userBrandId;
  };

  // ============================================
  // MSP/BRANDMASTER PERMISSIONS
  // ============================================

  /**
   * Check if user can create MSPs
   * Rules: Only Vituax Admin/Manager can create MSPs
   */
  const canCreateMSP = (): boolean => {
    return isVituaxUser && isAdminOrManager;
  };

  /**
   * Check if user can edit an MSP
   * Rules:
   * - Member cannot edit any MSP
   * - Vituax Admin/Manager can edit any MSP
   * - MSP Admin/Manager can only edit their own MSP
   */
  const canEditMSP = (msp: MSPEntity): boolean => {
    if (!isAdminOrManager) return false;

    // Vituax admin/manager can edit any MSP
    if (isVituaxUser) return true;

    // MSP admin/manager can only edit their own MSP
    return msp.idBrandMaster === userBrandId;
  };

  /**
   * Check if user can delete an MSP
   * Rules: Only Vituax Admin can delete MSPs
   */
  const canDeleteMSP = (): boolean => {
    return isVituaxUser && isAdmin;
  };

  // ============================================
  // USER/EMPLOYEE PERMISSIONS
  // ============================================

  /**
   * Check if user can create employees
   * Rules:
   * - Member cannot create
   * - Admin/Manager can create for their company
   * - Vituax Admin/Manager can create for any company
   */
  const canCreateEmployee = (): boolean => {
    return isAdminOrManager;
  };

  /**
   * Check if user can edit an employee
   * Rules:
   * - User can edit their own profile
   * - Vituax Admin/Manager can edit any user
   * - MSP Admin/Manager can only edit users from their company
   */
  const canEditUser = (user: UserEntity): boolean => {
    if (!loggedUserId || !role) return false;

    // Self can always edit (their own profile)
    if (loggedUserId === user.idUser) return true;

    // Members cannot edit others
    if (isMember) return false;

    // Vituax admin/manager can edit anyone
    if (isVituaxUser) return true;

    // Admin/Manager can only edit users from same company
    return user.idBrandMaster === userBrandId;
  };

  /**
   * Check if user can delete an employee
   * Rules:
   * - Only admins can delete
   * - Vituax admin can delete any user
   * - MSP admin can only delete users from their company
   */
  const canDeleteUser = (user: UserEntity): boolean => {
    if (!loggedUserId || !isAdmin) return false;

    // Vituax admin can delete anyone
    if (isVituaxUser) return true;

    // Admin can only delete users from same company
    return user.idBrandMaster === userBrandId;
  };

  // ============================================
  // NAVIGATION/ACCESS PERMISSIONS
  // ============================================

  /**
   * Check if user can access employee registration page
   * Rules: Member cannot access
   */
  const canAccessEmployeeRegister = (): boolean => {
    return isAdminOrManager;
  };

  /**
   * Check if user can access MSP registration page
   * Rules:
   * - Vituax Admin/Manager: Full access
   * - MSP Admin/Manager: Can view/edit their own MSP
   * - Member: No access
   */
  const canAccessMSPPage = (): boolean => {
    return isAdminOrManager;
  };

  /**
   * Check if user can access VM creation page
   * Rules: Member cannot access
   */
  const canAccessCreateVM = (): boolean => {
    return isAdminOrManager;
  };

  /**
   * Check if user can edit White Label settings
   * Rules:
   * - Vituax users cannot edit (they don't have their own company settings)
   * - Only MSP Admin can edit their company's white label
   */
  const canEditWhiteLabel = (): boolean => {
    return isAdmin && !isVituaxUser;
  };

  /**
   * Get the MSP page path based on user type
   * - Vituax: goes to list page (/msp-register)
   * - MSP Admin/Manager: goes directly to edit page (/msp-register/edit/:id)
   */
  const getMSPPagePath = (): string => {
    if (isVituaxUser) {
      return "/msp-register";
    }
    // MSP users go directly to edit their own company
    return `/msp-register?edit=${userBrandId}`;
  };

  return {
    // User info
    isVituaxUser,
    isAdmin,
    isManager,
    isMember,
    isAdminOrManager,
    userBrandId,
    loggedUserId,

    // VM permissions
    canCreateVM,
    canControlVM,
    canDeleteVM,

    // MSP permissions
    canCreateMSP,
    canEditMSP,
    canDeleteMSP,
    canAccessMSPPage,
    getMSPPagePath,

    // User permissions
    canCreateEmployee,
    canEditUser,
    canDeleteUser,

    // Navigation permissions
    canAccessEmployeeRegister,
    canAccessCreateVM,
    canEditWhiteLabel,
  };
};
