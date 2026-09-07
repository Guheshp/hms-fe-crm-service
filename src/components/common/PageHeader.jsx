import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { BUTTON_STYLES, COLORS } from "../../constants/theme";

const PageHeader = ({
  title,
  subtitle,
  showBackButton = false,
  backText = "Back",
  backPath,
  buttonText,
  buttonIcon,
  onButtonClick,
  buttonDisabled = false,
  actions,
  mb = 2,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    backPath ? navigate(backPath) : navigate(-1);
  };

  return (
    <Box
      sx={{
        mb,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: 24,
            // fontWeight: 600,
            color: COLORS.text,
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: COLORS.textSecondary,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {showBackButton && (
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleBack}
            // sx={{
            //   height: 40,
            //   px: 2.5,
            //   borderRadius: 2,
            //   textTransform: "none",
            //   fontSize: 14,
            //   fontWeight: 600,
            //   borderColor: COLORS.border,
            //   color: COLORS.text,

            //   "&:hover": {
            //     borderColor: COLORS.primary,
            //     backgroundColor: COLORS.primaryLight,
            //   },
            // }}
          >
            {backText}
          </Button>
        )}

        {actions
          ? actions
          : buttonText && (
              <Button
                variant="contained"
                startIcon={buttonIcon}
                onClick={onButtonClick}
                disabled={buttonDisabled}
              >
                {buttonText}
              </Button>
            )}
      </Box>
    </Box>
  );
};

export default PageHeader;
