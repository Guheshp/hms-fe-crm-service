import { Chip } from "@mui/material";

const variants = {
  success: {
    label: "Success",
    bg: "#E8F5E9",
    color: "#2E7D32",
  },
  error: {
    label: "Error",
    bg: "#FDECEC",
    color: "#D32F2F",
  },
  warning: {
    label: "Warning",
    bg: "#FFF8E1",
    color: "#F57C00",
  },
  info: {
    label: "Info",
    bg: "#E3F2FD",
    color: "#1565C0",
  },
  primary: {
    label: "Primary",
    bg: "#EEF2FF",
    color: "#4338CA",
  },
};

const StatusChip = ({
  type = "info",
  label,
  size = "small",
  onClick,
  clickable = false,
}) => {
  const variant = variants[type];

  return (
    <Chip
      label={label || variant.label}
      size={size}
      clickable={clickable}
      onClick={onClick}
      sx={{
        fontWeight: 600,
        borderRadius: "8px",
        bgcolor: variant.bg,
        color: variant.color,
        cursor: clickable ? "pointer" : "default",
        "&:hover": clickable
          ? {
              opacity: 0.9,
            }
          : {},
      }}
    />
  );
};

export default StatusChip;
