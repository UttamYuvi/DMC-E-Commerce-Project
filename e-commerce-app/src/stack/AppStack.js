import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import BottomTabs from "../navigation/BottomTabs";
import { store } from "../../store";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: "#a2f5f3"
            },
            headerTitleStyle: {
          fontWeight: "700",
          color: "#111",
        },
        headerTintColor: "#111",
          }}
        >
          <Stack.Group>
            <Stack.Screen name="MainPages" component={BottomTabs} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
