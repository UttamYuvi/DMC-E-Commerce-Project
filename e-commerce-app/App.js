import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import BottomTabs from "./src/navigation/BottomTabs";
import { Provider } from "react-redux";
import { store } from "./store";
import { AuthProvider } from "./src/context/AuthContext";
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Group>
              <Stack.Screen name="MainPages" component={BottomTabs} />

              <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
      <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
