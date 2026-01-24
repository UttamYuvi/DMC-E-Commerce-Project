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
