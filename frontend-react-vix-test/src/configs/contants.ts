export const MIN_PASS_SIZE = 12;
export const ISO_IMAGE_DEFAULT =
  "https://vituax.cloud/api/v1/uploads/1762889467227-disk.png";
export const MAX_DESCRIPTION_ISO = 190;
export const MAX_TRY_CHECKER_STATUS_VM_PROMETHEUS = 3;
export const FETCH_INTERVAL = 5000;
export const FETCH_INTERVAL_VM_STATUS = 20000;
export const CHECKER_SERVER_TIMEOUT_MIN = 5;
export const FECTH_CHECKER_TIME_SERVER_MIN = 3;

export const LOCATION_OPTIONS = [
  { label: "Brasil", value: "BRAZIL" },
  { label: "United States", value: "USA" },
  { label: "Europe", value: "EUROPE" },
] as const;

export const SECTOR_OPTIONS = [
  { label: "Telecom", value: "Telecom" },
  { label: "Technology", value: "Technology" },
  { label: "Finance", value: "Finance" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Education", value: "Education" },
  { label: "Retail", value: "Retail" },
  { label: "Other", value: "Other" },
] as const;
