import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "./subScreens/AccountScreen";
import MyOrders from "./subScreens/MyOrder";
import MyProfile from "./subScreens/MyProfile";
import UpdatePassword from "./subScreens/UpdatePassword";

const Stack = createNativeStackNavigator();

export default function Account() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#a2f5f3",
        },
        headerTitleStyle: {
          fontWeight: "700",
          color: "#111",
        },
        headerTintColor: "#111",
        // headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="AccountHome"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
    </Stack.Navigator>
  );
}
