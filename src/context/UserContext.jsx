import { createContext, useContext, useState } from "react";

import { logOut } from "../api/auth";
import { errorAlert, successAlert } from "../utils/alerts";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  };

  const logout = async () => {
    try {
      if (user?.id) {
        const response = await logOut({
          userid: user.id,
        });

        successAlert(response.data.message);
      }
    } catch (error) {
      errorAlert(error.response?.data?.message || "Logout failed.");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      setUser(null);
    }
  };

  const updateUser = (updatedFields) => {
    const updatedUser = {
      ...user,
      ...updatedFields,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setUser(updatedUser);
  };

  const isAuthenticated = Boolean(user);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateUser,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
};
