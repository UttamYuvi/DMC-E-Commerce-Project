import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQty,
  incrementQty,
  removeFromCart,
  updateQuantity,
} from "../slice/cartSlice";

function AddToCartButton({ product, style }) {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.productId === product.productId),
  );

  const quantity = cartItem?.quantity || 0;

  const onAdd = () => {
    dispatch(addToCart(product));
  };

  const onIncrease = () => {
    dispatch(incrementQty(product.productId));
  };

  const onDecrease = () => {
    if (quantity === 1) {
      dispatch(removeFromCart(product));
    } else {
      dispatch(decrementQty(product.productId));
    }
  };

  if (!cartItem) {
    return (
      <TouchableOpacity
        style={[
          {
            backgroundColor: "#f97705",
            padding: 12,
            borderRadius: 6,
            alignItems: "center",
          },
          style,
        ]}
        onPress={onAdd}
      >
        <Text style={styles.addText}>Add to Cart</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#ff4f2c",
          borderRadius: 6,
          overflow: "hidden",
          justifyContent: "space-between",
        },
        style,
      ]}
    >
      <TouchableOpacity style={styles.controlBtn} onPress={onDecrease}>
        <Text style={styles.controlText}>−</Text>
      </TouchableOpacity>

      <Text style={styles.quantity}>{quantity}</Text>

      <TouchableOpacity style={styles.controlBtn} onPress={onIncrease}>
        <Text style={styles.controlText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  addText: {
    color: "#fff",
    fontWeight: "bold",
  },
  controlBtn: {
    paddingHorizontal: 16,
    // paddingVertical: 3,
    backgroundColor: "#FF7A00",
  },
  controlText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  quantity: {
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 12,
  },
});

// const styles = StyleSheet.create({
//   addText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   controlBtn: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     backgroundColor: "#a2f5f3",
//   },
//   controlText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },

//   quantity: {
//     fontSize: 16,
//     fontWeight: "600",
//     paddingHorizontal: 12,
//   },
// });

export default AddToCartButton;
