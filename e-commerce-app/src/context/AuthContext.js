import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clear } from "../slice/cartSlice";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // 🔹 Load auth on app start
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const storedAuth = await AsyncStorage.getItem("auth");

        if (storedAuth) {
          const parsedAuth = JSON.parse(storedAuth);
          setUser(parsedAuth);
        }
      } catch (err) {
        console.log("Failed to load auth", err);
      } finally {
        setLoading(false);
      }
    };

    loadAuth();
  }, []);

  const login = async (userData) => {
    const authData = {
      token: userData.data.token,
      email: userData.data.email,
      firstName: userData.data.firstName,
      lastName: userData.data.lastName,
      mobile: userData.data.mobile,
      gender: userData.data.gender,
    };

    setUser(authData);
    await AsyncStorage.setItem("auth", JSON.stringify(authData));
  };

  const logout = async () => {
    setUser(null);
    dispatch(clear());
    await AsyncStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
