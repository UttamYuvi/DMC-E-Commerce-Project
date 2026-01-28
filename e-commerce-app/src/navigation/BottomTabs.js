import HomeScreen from "../screens/mainScreens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoriesScreen from "../screens/mainScreens/Categories";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Home from "../screens/mainScreens/Home";
import { useSelector } from "react-redux";
import Cart from "../screens/mainScreens/Cart";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Account from "../screens/mainScreens/Account";
import LoginModal from "../components/modals/LoginModal";
import { useNavigation } from "@react-navigation/core";

const Tab = createBottomTabNavigator();

function DummyScreen() {
  return null;
}

export default function BottomTabs() {
  const items = useSelector((state) => state.cart.items);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation()
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginSuccess = () => {
    setShowLogin(false)
  }



  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => {
              return <Ionicons name="cart-outline" size={20} />;
            },
          }}
        />
        <Tab.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            tabBarIcon: () => {
              return <Ionicons name="bag-outline" size={20} />;
            },
          }}
        />

        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarBadge: items.length > 0 ? items.length : undefined,
            tabBarBadgeStyle: {
              backgroundColor: "#FF5533",
              color: "#fff",
              fontSize: 12,
              fontWeight: "600",
            },
            tabBarIcon: ({ color, size }) => {
              return (
                <Ionicons
                  name="reorder-four-outline"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />

        {user ? (
          <Tab.Screen
            name="Account"
            component={Account}
            options={{
              tabBarIcon: () => {
                return <Ionicons name="cog-outline" size={20} />;
              },
            }}
          />
        ) : (
          <Tab.Screen
        name="login"
        component={DummyScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            setShowLogin(true)
          }
        }}
        />
      )}

      </Tab.Navigator>
      <LoginModal
      visible={showLogin}
      onClose={handleLoginSuccess}
      onOpenClose={()=>setShowLogin(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
