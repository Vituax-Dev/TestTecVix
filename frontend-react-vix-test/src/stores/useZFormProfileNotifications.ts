import { create } from "zustand";

type FormValueTypes = {
  value: string;
  errorMessage: string;
};

export interface IFormProfileNotificationsVar {
  fullNameForm: FormValueTypes;
  userName: FormValueTypes;
  currentPassword: FormValueTypes;
  password: FormValueTypes;
  confirmPassword: FormValueTypes;
  userEmail: FormValueTypes;
  userPhone: FormValueTypes;
  companyName: FormValueTypes;
  setorName: FormValueTypes;
  fieldName: FormValueTypes;
  cityName: FormValueTypes;
  locationName: FormValueTypes;
  role: FormValueTypes;
  timeZone: FormValueTypes;
  companyEmail: FormValueTypes;
  companySMS: FormValueTypes;
  manual: FormValueTypes;
  termsOfUse: FormValueTypes;
  privacyPolicy: FormValueTypes;
}

const INIT_STATE: IFormProfileNotificationsVar = {
  fullNameForm: {
    value: "",
    errorMessage: "",
  },
  userName: {
    value: "",
    errorMessage: "",
  },
  currentPassword: {
    value: "",
    errorMessage: "",
  },
  password: {
    value: "",
    errorMessage: "",
  },
  confirmPassword: {
    value: "",
    errorMessage: "",
  },
  userEmail: {
    value: "",
    errorMessage: "",
  },
  userPhone: {
    value: "",
    errorMessage: "",
  },
  companyName: {
    value: "",
    errorMessage: "",
  },
  setorName: {
    value: "",
    errorMessage: "",
  },
  fieldName: {
    value: "",
    errorMessage: "",
  },
  cityName: {
    value: "",
    errorMessage: "",
  },
  locationName: {
    value: "",
    errorMessage: "",
  },
  role: {
    value: "",
    errorMessage: "",
  },
  timeZone: {
    value: "",
    errorMessage: "",
  },
  companyEmail: {
    value: "",
    errorMessage: "",
  },
  companySMS: {
    value: "",
    errorMessage: "",
  },
  manual: {
    value: "",
    errorMessage: "",
  },
  termsOfUse: {
    value: "",
    errorMessage: "",
  },
  privacyPolicy: {
    value: "",
    errorMessage: "",
  },
};

interface IFormProfileNotifications extends IFormProfileNotificationsVar {
  setFormProfileNotifications: (
    formProfileNotifications: Partial<IFormProfileNotificationsVar>,
  ) => void;
  resetAll: () => void;
}

export const useZFormProfileNotifications = create<IFormProfileNotifications>(
  (set) => ({
    ...INIT_STATE,
    setFormProfileNotifications: (formProfileNotifications) =>
      set((state) => ({ ...state, ...formProfileNotifications })),
    resetAll: () => set((state) => ({ ...state, ...INIT_STATE })),
  }),
);
