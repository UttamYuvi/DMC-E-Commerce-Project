import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../../components/ProductCard";
import AddressModal from "../../components/modals/AddressModal";
import LoginModal from "../../components/modals/LoginModal";

function CartScreen() {
  const [footerHeight, setFooterHeight] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // const user = useSelector((state) => state.auth.user);

  const items = useSelector((state) => state.cart.items);
  useEffect(() => {
    console.log("cart items : ", items);
  }, [items]);

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
    // if (!user) {
    //   setShowLoginModal(true);
    // } else {
    //   setShowAddressModal(true);
    // }
  };

  return (
    <View style={commonStyles.container}>
      <View style={styles.homeHeader}>
        <Text style={commonStyles.title}>Cart</Text>
      </View>

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

        <TouchableOpacity style={styles.checkoutBtn} onPress={onCheckoutPress}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>

      <LoginModal
        visible={showLoginModal}
        onClose={(success) => {
          setShowLoginModal(false);
          if (success) setShowAddressModal(true);
        }}
      />

      <AddressModal
        visible={showAddressModal}
        onConfirm={(address) => {
          setShowAddressModal(false);
          placeOrder(address);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    padding: 20,
    paddingTop: 45,
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
    backgroundColor: "#fff",
    padding: 16,
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
    color: "#555",
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
    backgroundColor: "#FF5533",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CartScreen;
