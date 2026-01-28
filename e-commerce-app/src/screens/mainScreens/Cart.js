import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "./Cart/CartScreen";
import CheckoutScreen from "./Checkout/CheckoutScreen";
import PlaceOrderScreen from "./Checkout/PlaceOrderScreen";
import { useSelector } from "react-redux";

function Cart() {
  const Stack = createNativeStackNavigator();

  

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="PlaceOrderScreen" component={PlaceOrderScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default Cart;
