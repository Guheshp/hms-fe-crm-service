import React, { useRef, useState } from "react";
import {
  AccountCircle,
  EmailOutlined,
  PhoneOutlined,
  BadgeOutlined,
  CalendarTodayOutlined,
  LoginOutlined,
  VerifiedOutlined,
  LockOutlined,
  Logout,
  PhotoCameraOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
  Button,
} from "@mui/material";

import { COLORS } from "../../constants/theme";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { formatDate, uploadImage } from "../../utils/common";
import { getById, updateProfileImage } from "../../api/users";
import { errorAlert, successAlert } from "../../utils/alerts";

const Profile = () => {
  const { user, logout, updateUser } = useUser();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fullName = `${user?.firstname || ""} ${user?.lastname || ""}`.trim();

  const getInitials = () => {
    const first = user?.firstname?.charAt(0) || "";
    const last = user?.lastname?.charAt(0) || "";

    return `${first}${last}`.toUpperCase();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const handleProfileImageChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploadingImage(true);

      await uploadImage({
        file,
        apiCall: updateProfileImage,
        fieldName: "profileimage",
        fields: {
          id: user.id,
        },
      });

      // Get updated user details
      const response = await getById(user.id);

      const updatedUser = response.data?.data;

      if (updatedUser) {
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // If your UserContext exposes updateUser, update it here
        updateUser(updatedUser);
      }

      successAlert("Profile picture updated successfully.");
    } catch (error) {
      errorAlert(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile picture.",
      );
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  };
  return (
    <Box>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Profile Card */}
        <Card
          elevation={0}
          sx={{
            border: "1px solid #CBD5E1",
            borderRadius: 3,
            boxShadow: "0 2px 6px rgba(15, 23, 42, 0.06)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div className="flex flex-col items-center text-center">
              <Avatar
                src={user?.profileimageurl || ""}
                sx={{
                  width: 88,
                  height: 88,
                  backgroundColor: COLORS.primaryLight || "#EDE9FE",
                  color: COLORS.primary,
                  fontSize: 30,
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                {!user?.profileimageurl && getInitials()}
              </Avatar>

              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#0F172A",
                }}
              >
                {fullName || "User"}
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 14,
                  color: "#64748B",
                }}
              >
                {user?.email || "—"}
              </Typography>

              <div className="mt-4 flex items-center justify-center gap-2">
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<PhotoCameraOutlined />}
                  disabled={uploadingImage}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadingImage ? "Uploading..." : "Update Profile Picture"}
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  hidden
                  onChange={handleProfileImageChange}
                />
              </div>
            </div>

            <Divider sx={{ my: 3 }} />

            <div className="space-y-4">
              <ProfileItem
                icon={<BadgeOutlined />}
                label="User Number"
                value={user?.usernumber}
              />

              <ProfileItem
                icon={<EmailOutlined />}
                label="Email"
                value={user?.email}
              />

              <ProfileItem
                icon={<PhoneOutlined />}
                label="Phone"
                value={user?.phone}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Details */}
        <div className="space-y-5 lg:col-span-2">
          <Card
            elevation={0}
            sx={{
              border: "1px solid #CBD5E1",
              borderRadius: 3,
              boxShadow: "0 2px 6px rgba(15, 23, 42, 0.06)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#0F172A",
                }}
              >
                Personal Information
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "#64748B",
                }}
              >
                Your basic personal information.
              </Typography>

              <Divider sx={{ my: 2.5 }} />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <ProfileItem
                  icon={<AccountCircle />}
                  label="First Name"
                  value={user?.firstname}
                />

                <ProfileItem
                  icon={<AccountCircle />}
                  label="Last Name"
                  value={user?.lastname}
                />

                <ProfileItem
                  icon={<EmailOutlined />}
                  label="Email Address"
                  value={user?.email}
                />

                <ProfileItem
                  icon={<PhoneOutlined />}
                  label="Phone Number"
                  value={user?.phone}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card
            elevation={0}
            sx={{
              border: "1px solid #CBD5E1",
              borderRadius: 3,
              boxShadow: "0 2px 6px rgba(15, 23, 42, 0.06)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#0F172A",
                }}
              >
                Account Information
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "#64748B",
                }}
              >
                Information about your account activity and security.
              </Typography>

              <Divider sx={{ my: 2.5 }} />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <ProfileItem
                  icon={<BadgeOutlined />}
                  label="User Number"
                  value={user?.usernumber}
                />

                <ProfileItem
                  icon={<CalendarTodayOutlined />}
                  label="Account Created"
                  value={formatDate(user?.createdat)}
                />

                <ProfileItem
                  icon={<LoginOutlined />}
                  label="Last Login"
                  value={formatDate(user?.lastloginat)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card
            elevation={0}
            sx={{
              border: "1px solid #CBD5E1",
              borderRadius: 3,
              boxShadow: "0 2px 6px rgba(15, 23, 42, 0.06)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#0F172A",
                }}
              >
                Security
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "#64748B",
                }}
              >
                Manage your account security.
              </Typography>

              <Divider sx={{ my: 2.5 }} />

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<LockOutlined />}
                >
                  Change Password
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Logout />}
                  onClick={handleLogout}
                  sx={{
                    minHeight: 40,
                    px: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    color: "#DC2626",
                    borderColor: "#FCA5A5",
                    "&:hover": {
                      backgroundColor: "#FEF2F2",
                      borderColor: "#F87171",
                    },
                  }}
                >
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Box>
  );
};

const ProfileItem = ({ icon, label, value, valueColor = "#0F172A" }) => {
  return (
    <div className="flex items-start gap-3">
      <Box
        sx={{
          width: 36,
          height: 36,
          minWidth: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          backgroundColor: "#F8FAFC",
          color: "#64748B",
          border: "1px solid #E2E8F0",
          "& svg": {
            fontSize: 19,
          },
        }}
      >
        {icon}
      </Box>

      <div className="min-w-0">
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 500,
            color: "#64748B",
            mb: 0.3,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            color: valueColor,
            wordBreak: "break-word",
          }}
        >
          {value || "—"}
        </Typography>
      </div>
    </div>
  );
};

export default Profile;
