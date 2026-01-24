import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./subScreens/HomeScreen";
import ProductDetails from "./subScreens/ProductDetails";
import ProductList from "./subScreens/ProductList";

function Home() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default Home;
