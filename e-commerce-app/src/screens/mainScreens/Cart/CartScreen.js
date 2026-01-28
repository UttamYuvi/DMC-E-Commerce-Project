import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import { useSelector } from "react-redux";
import { useContext, useEffect, useMemo, useState } from "react";
import ProductCard from "../../../components/ProductCard";
import AddressModal from "../../../components/modals/AddressModal";
import LoginModal from "../../../components/modals/LoginModal";
import { AuthContext } from "../../../context/AuthContext";

function CartScreen({ navigation }) {
  const [footerHeight, setFooterHeight] = useState(0);

  const items = useSelector((state) => state.cart.items);

  const { totalQuantity, totalAmount } = useMemo(() => {
    return {
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    };
  }, [items]);

  const onCheckoutPress = () => {
    navigation.navigate("Checkout");
  };

  return (
    <View style={commonStyles.container}>
      <View style={styles.homeHeader}>
        <Text style={commonStyles.title}>Cart</Text>
      </View>

      {items.length > 0 ? (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.productId.toString()}
            renderItem={({ item }) => <ProductCard item={item} />}
            numColumns={2}
            contentContainerStyle={{
              paddingBottom: footerHeight + 12,
            }}
            showsVerticalScrollIndicator={false}
          />
          <View
            style={styles.cartFooter}
            onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}
          >
            <View style={styles.row}>
              <Text style={styles.label}>Items ({totalQuantity})</Text>
              <Text style={styles.value}>₹ {totalAmount}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Delivery</Text>
              <Text style={[styles.value, { color: "green" }]}>FREE</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹ {totalAmount}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={onCheckoutPress}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Your cart is empty 🛒</Text>
            <Text style={styles.emptySubtitle}>
              Looks like you haven’t added anything yet
            </Text>

            <TouchableOpacity
              style={styles.emptyBtn}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.emptyBtnText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    padding: 20,
    paddingTop: 45,
    backgroundColor: "#a2f5f3",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  productContainer: {
    flex: 1,
  },
  cartFooter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#a2f5f3",
    padding: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    elevation: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  label: {
    fontSize: 14,
    color: "#302f2f",
  },

  value: {
    fontSize: 14,
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
  },

  totalValue: {
    fontSize: 16,
    fontWeight: "700",
  },

  checkoutBtn: {
    marginTop: 12,
    backgroundColor: "#f97705",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#033f40",
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },

  emptyBtn: {
    backgroundColor: "#f97705",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    elevation: 4,
  },

  emptyBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

// const styles = StyleSheet.create({
//   homeHeader: {
//     padding: 20,
//     paddingTop: 45,
//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 100,
//   },
//   productContainer: {
//     flex: 1,
//   },
//   cartFooter: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     backgroundColor: "#fff",
//     padding: 16,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: -2 },
//     elevation: 10,
//   },

//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 6,
//   },

//   label: {
//     fontSize: 14,
//     color: "#555",
//   },

//   value: {
//     fontSize: 14,
//     fontWeight: "500",
//   },

//   divider: {
//     height: 1,
//     backgroundColor: "#eee",
//     marginVertical: 10,
//   },

//   totalLabel: {
//     fontSize: 16,
//     fontWeight: "600",
//   },

//   totalValue: {
//     fontSize: 16,
//     fontWeight: "700",
//   },

//   checkoutBtn: {
//     marginTop: 12,
//     backgroundColor: "#FF5533",
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },

//   checkoutText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

export default CartScreen;
