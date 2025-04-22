import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
