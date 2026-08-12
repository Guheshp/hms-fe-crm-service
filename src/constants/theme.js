// src/constants/theme.js

export const COLORS = {
  primary: "#2563EB",
  primaryLight: "#EFF6FF",

  text: "#0F172A",
  textSecondary: "#64748B",

  border: "#E2E8F0",

  background: "#F8FAFC",
  card: "#FFFFFF",

  success: "#16A34A",
  successLight: "#F0FDF4",

  warning: "#EA580C",
  warningLight: "#FFF7ED",

  error: "#DC2626",
  errorLight: "#FEF2F2",

  purple: "#7C3AED",
  purpleLight: "#F5F3FF",

  muted: "#94A3B8",
  scrollbar: "#CBD5E1",
};

export const TYPOGRAPHY = {
  pageTitle: {
    fontSize: 28,
    fontWeight: 700,
  },

  pageSubtitle: {
    fontSize: 14,
    fontWeight: 400,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 700,
  },

  cardSubtitle: {
    fontSize: 14,
    fontWeight: 400,
  },

  tableHeader: {
    fontSize: 14,
    fontWeight: 700,
  },

  tablePrimary: {
    fontSize: 14,
    fontWeight: 600,
  },

  tableSecondary: {
    fontSize: 12,
    fontWeight: 400,
  },

  formLabel: {
    fontSize: 14,
    fontWeight: 600,
  },

  formInput: {
    fontSize: 14,
    fontWeight: 400,
  },

  button: {
    fontSize: 14,
    fontWeight: 600,
  },

  chip: {
    fontSize: 12,
    fontWeight: 600,
  },
};

export const RADIUS = {
  sm: 2,
  md: 3,
  lg: 4,
};

export const SHADOWS = {
  card: "0 1px 3px rgba(15, 23, 42, 0.08)",

  hover: "0 10px 25px rgba(15, 23, 42, 0.08)",

  sidebar: "0 4px 20px rgba(15, 23, 42, 0.05)",
};

export const SPACING = {
  page: 3,
  section: 2,
  card: 3,
};

export const DATAGRID = {
  rowHeight: 72,

  headerHeight: 56,
};

export const BUTTON_STYLES = {
  height: 40,
  px: 2.5,
  borderRadius: 2,
  textTransform: "none",
  fontSize: 14,
  fontWeight: 600,
  backgroundColor: COLORS.primary,
  color: "#FFFFFF",
  boxShadow: "none",

  "&:hover": {
    backgroundColor: COLORS.primary,
    boxShadow: "none",
  },
};
