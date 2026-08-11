import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PageHeader = ({
  title,
  subtitle,

  // Back Button
  showBackButton = false,
  backText = "Back",
  backPath,

  // Default Action Button
  buttonText,
  buttonIcon,
  onButtonClick,

  // Custom Actions
  actions,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {/* Left */}
      <Box>
        <Typography variant="h5" fontWeight={700}>
          {title}
        </Typography>

        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Right */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {showBackButton && (
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleBack}
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
                sx={{
                  textTransform: "none",
                  px: 3,
                  borderRadius: 2,
                  fontWeight: 600,
                }}
              >
                {buttonText}
              </Button>
            )}
      </Box>
    </Box>
  );
};

export default PageHeader;
