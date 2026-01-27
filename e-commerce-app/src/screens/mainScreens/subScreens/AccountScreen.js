import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../../context/AuthContext";
function AccountScreen() {
  const navigation = useNavigation();
  const { logout, user } = useContext(AuthContext);
  console.log("user", user);

  const MenuItem = ({ icon, title, onPress, color = "#333" }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={22} color={color} />
        <Text style={styles.menuText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={80} color="#FF5533" />
        <Text style={styles.name}>
          {user?.firstname + " " + user?.lastName || "My Account"}
        </Text>
        <Text style={styles.mobile}>{user?.mobile || ""}</Text>
      </View>
      <View style={styles.card}>
        <MenuItem
          icon="bag-outline"
          title="My Orders"
          onPress={() => navigation.navigate("MyOrders")}
        />

        <MenuItem
          icon="person-outline"
          title="My Profile"
          onPress={() => navigation.navigate("MyProfile")}
        />

        <MenuItem
          icon="lock-closed-outline"
          title="Change Password"
          onPress={() => navigation.navigate("UpdatePassword")}
        />

        <MenuItem
          icon="log-out-outline"
          title="Logout"
          color="#E53935"
          onPress={logout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  header: {
    backgroundColor: "#a2f5f3",
    alignItems: "center",
    paddingVertical: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
    color: "#111",
  },

  mobile: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fdfdfd",
    margin: 16,
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  menuText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});

export default AccountScreen;
