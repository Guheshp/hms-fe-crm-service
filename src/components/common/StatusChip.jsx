import { Chip } from "@mui/material";

const variants = {
  success: {
    bg: "#F0FDF4",
    color: "#16A34A",
  },

  error: {
    bg: "#FEF2F2",
    color: "#DC2626",
  },

  warning: {
    bg: "#FFF7ED",
    color: "#EA580C",
  },

  info: {
    bg: "#EFF6FF",
    color: "#2563EB",
  },

  primary: {
    bg: "#EFF6FF",
    color: "#2563EB",
  },

  secondary: {
    bg: "#F1F5F9",
    color: "#475569",
  },
};

const StatusChip = ({
  type = "info",
  label,
  size = "small",
  onClick,
  clickable = false,
}) => {
  const variant = variants[type] || variants.info;

  return (
    <Chip
      label={label || "-"}
      size={size}
      clickable={clickable}
      onClick={onClick}
      sx={{
        height: 28,

        px: 0.5,

        fontSize: 12,

        fontWeight: 600,

        borderRadius: 2,

        backgroundColor: variant.bg,

        color: variant.color,

        border: "1px solid transparent",

        cursor: clickable ? "pointer" : "default",

        "& .MuiChip-label": {
          px: 1,
        },

        "&:hover": clickable
          ? {
              backgroundColor: variant.bg,
              opacity: 0.85,
            }
          : {},
      }}
    />
  );
};

export default StatusChip;
