import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductList from "./subScreens/ProductList";
import ProductDetails from "./subScreens/ProductDetails";
import CategorySubCategoryScreen from "./subScreens/CategorySubCategoryScreen";

function CategoriesScreen() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="CategorySubCategoryScreen"
          component={CategorySubCategoryScreen}
        />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default CategoriesScreen;
