import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/mainScreens/subScreens/Account";
import MyOrders from "../screens/mainScreens/subScreens/MyOrders";
import MyProfile from "../screens/mainScreens/subScreens/MyProfile";
import UpdatePassword from "../screens/mainScreens/subScreens/UpdatePassword";

const Stack = createNativeStackNavigator();    

export default function AccountStack() {
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
