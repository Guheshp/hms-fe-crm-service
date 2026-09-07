import { LoadingButton } from "@mui/lab";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CustomButton = ({
  children,
  type = "button",
  variant = "contained",
  color = "primary",
  loading = false,
  disabled = false,
  back = false,
  to,
  onClick,
  startIcon,
  endIcon,
  sx = {},
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (back) {
      if (to) {
        navigate(to);
      } else {
        navigate(-1);
      }
      return;
    }

    onClick?.();
  };

  return (
    <LoadingButton
      type={type}
      variant={variant}
      color={color}
      loading={loading}
      disabled={disabled}
      onClick={handleClick}
      startIcon={back ? <ArrowBack fontSize="small" /> : startIcon}
      endIcon={endIcon}
      size="medium"
      // sx={{
      //   textTransform: "none",
      //   borderRadius: 2,
      //   minWidth: 120,
      //   height: 40,
      //   px: 2.5,
      //   fontWeight: 600,
      //   fontSize: "0.875rem",
      //   boxShadow: "none",
      //   ...sx,
      // }}
    >
      {children}
    </LoadingButton>
  );
};

export default CustomButton;
