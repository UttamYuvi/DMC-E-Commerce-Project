import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          console.log("storeduser",storedUser)
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.log("Failed to load user", e);
      } finally {
        setLoading(false);
      }
    };
    loadUser()
   },[])

  const login = async (data) => {
    const userData = {
    token: data.token,
    firstname: data.firstname,
    lastName: data.lastName,
    mobile: data.mobile,
    gender: data.gender,
    email: data.email
  };
    await AsyncStorage.setItem("user",JSON.stringify(userData))
    setUser(userData)
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  };
  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
