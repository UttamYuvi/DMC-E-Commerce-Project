import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getAllUserOrders } from "../../../services/order";
import { AuthContext } from "../../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(user);

  const getAllOrder = async () => {
    const result = await getAllUserOrders(user.token);
    setOrders(result);
  };

  useLayoutEffect(() => {}, []);

  useEffect(() => {
    if (user?.token) {
      getAllOrder();
    }
  }, [user]);

  const renderOrder = ({ item }) => {
    const {
      orderId,
      totalAmount,
      orderStatus,
      paymentStatus,
      deliveryAddress,
      orderDetails,
    } = item;

    return (
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.rowBetween}>
          <Text style={styles.orderId}>Order #{orderId}</Text>
          <Text
            style={[
              styles.status,
              orderStatus === "placed" ? styles.placed : styles.cancelled,
            ]}
          >
            {orderStatus.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.amount}>₹ {totalAmount}</Text>

        {/* Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products</Text>

          {orderDetails.length === 0 ? (
            <Text style={styles.emptyText}>No products found</Text>
          ) : (
            orderDetails.map((p, index) => (
              <View key={index} style={styles.productRow}>
                <Text style={styles.productName}>{p.name}</Text>
                <Text style={styles.productQty}>
                  {p.quantity} × ₹{p.price}
                </Text>
              </View>
            ))
          )}
        </View>

        {/* Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <Text style={styles.addressText}>
            {deliveryAddress.addressLine}, {deliveryAddress.city},{" "}
            {deliveryAddress.state} - {deliveryAddress.pincode}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Ionicons name="time-outline" size={16} color="#555" />
          <Text style={styles.deliveryText}>Delivery in 3 days</Text>

          <Text style={styles.payment}>Payment: {paymentStatus}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderId.toString()}
        renderItem={renderOrder}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a2f5f3",
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111",
  },

  card: {
    margin: 5,
    // marginHorizontal:10,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  status: {
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  placed: {
    backgroundColor: "#E8F5E9",
    color: "#2E7D32",
  },

  cancelled: {
    backgroundColor: "#FDECEA",
    color: "#C62828",
  },

  amount: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 6,
    color: "#309402",
  },

  section: {
    marginTop: 12,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#555",
  },

  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  productName: {
    fontSize: 14,
    color: "#333",
  },

  productQty: {
    fontSize: 14,
    color: "#666",
  },

  emptyText: {
    fontSize: 13,
    color: "#999",
    fontStyle: "italic",
  },

  addressText: {
    fontSize: 13,
    color: "#444444",
    lineHeight: 18,
    backgroundColor: "#dcdcdc",
    padding: 7,
    borderRadius: 8,
  },

  footer: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  deliveryText: {
    fontSize: 13,
    color: "#030303",
    marginLeft: 6,
    flex: 1,
  },

  payment: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FF6F00",
  },
});

export default MyOrders;
