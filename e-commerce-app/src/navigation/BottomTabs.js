import HomeScreen from "../screens/mainScreens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoriesScreen from "../screens/mainScreens/Categories";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Home from "../screens/mainScreens/Home";
import { useSelector } from "react-redux";
import Cart from "../screens/mainScreens/Cart";
import AccountStack from "../stack/AccountStack";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const items = useSelector((state) => state.cart.items);
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

        <Tab.Screen
          name="Acount"
          component={AccountStack}
          options={{
            tabBarIcon: () => {
              return <Ionicons name="cog-outline" size={20} />;
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
