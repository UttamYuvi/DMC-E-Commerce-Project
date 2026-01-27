import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import { CommonActions } from "@react-navigation/core";

function PlaceOrderScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { orderId, totalAmount, deliveryAddress, orderDetails } =
    route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={90} color="#2ECC71" />
      </View>

      <Text style={styles.title}>Order Placed Successfully</Text>
      <Text style={styles.subtitle}>
        Thank you! Your order has been confirmed.
      </Text>

      <View style={styles.card}>
        <Text style={styles.row}>
          <Text style={styles.label}>Order ID - </Text>
          <Text style={styles.value}>{orderId}</Text>
        </Text>

        <Text style={styles.row}>
          <Text style={styles.label}>Amount - </Text>
          <Text style={[styles.value, { color: "#00a746" }]}>
            ₹{totalAmount}
          </Text>
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>

        <View style={styles.addressBox}>
          <Text style={styles.addressText}>
            {deliveryAddress?.addressLine || "Selected delivery address"}
          </Text>

          <Text style={styles.addressText}>
            {deliveryAddress?.city}, {deliveryAddress?.state}
          </Text>

          <Text style={styles.addressText}>{deliveryAddress?.pincode}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items</Text>

        <FlatList
          data={orderDetails}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <View style={styles.productRow}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productQty}>{item.quantity}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Home" }],
              }),
            );
          }}
        >
          <Text style={styles.primaryBtnText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
  },

  iconContainer: {
    alignItems: "center",
    marginTop: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
    color: "#111",
  },

  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginTop: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  row: {
    fontSize: 16,
    marginBottom: 6,
  },

  label: {
    color: "#666",
  },

  value: {
    fontWeight: "600",
    color: "#111",
  },

  section: {
    marginTop: 24,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },

  productName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },

  productQty: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },

  addressBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },

  addressText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },

  footer: {
    marginTop: "auto",
    paddingBottom: 20,
  },

  primaryBtn: {
    backgroundColor: "#FF5533",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryBtn: {
    backgroundColor: "rgb(18, 176, 0)",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  secondaryBtnText: {
    textAlign: "center",
    marginTop: 12,
    color: "#000000",
    fontSize: 14,
  },
});

export default PlaceOrderScreen;
