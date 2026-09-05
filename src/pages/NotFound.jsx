import { ArrowBack, Home, SearchOff } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../constants/theme";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      className="flex min-h-screen items-center justify-center px-4"
      sx={{
        backgroundColor: "#F8FAFC",
      }}
    >
      <Box className="w-full max-w-xl text-center">
        {/* Icon */}

        <Box
          className="mx-auto mb-6 flex items-center justify-center rounded-3xl"
          sx={{
            width: 80,
            height: 80,
            backgroundColor: "#EEF2FF",
            color: COLORS.primary,
          }}
        >
          <SearchOff sx={{ fontSize: 40 }} />
        </Box>

        {/* 404 */}

        <Typography
          sx={{
            fontSize: {
              xs: 72,
              sm: 96,
            },
            lineHeight: 1,
            fontWeight: 800,
            letterSpacing: "-4px",
            color: COLORS.primary,
          }}
        >
          404
        </Typography>

        {/* Title */}

        <Typography
          sx={{
            mt: 3,
            fontSize: {
              xs: 24,
              sm: 30,
            },
            fontWeight: 700,
            color: "#0F172A",
          }}
        >
          Page not found
        </Typography>

        {/* Description */}

        <Typography
          sx={{
            mt: 1.5,
            mx: "auto",
            maxWidth: 460,
            fontSize: 15,
            lineHeight: 1.7,
            color: "#64748B",
          }}
        >
          The page you're looking for doesn't exist or may have been moved.
          Please check the URL or return to your dashboard.
        </Typography>

        {/* Actions */}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => navigate("/dashboard")}
            sx={{
              minHeight: 42,
              px: 2.5,
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "none",

              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            Go to Dashboard
          </Button>

          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{
              minHeight: 42,
              px: 2.5,
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 600,
              borderColor: "#CBD5E1",
              color: "#475569",
            }}
          >
            Go Back
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default NotFound;
