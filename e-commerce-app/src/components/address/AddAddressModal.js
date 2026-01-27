import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import AddressForm from "./AddressForm";
import { useContext, useState } from "react";
import { addUserAddress } from "../../services/address";
import { AuthContext } from "../../context/AuthContext";

export default function AddAddressModal({ visible, onSave, onClose }) {
  const { user } = useContext(AuthContext);
  const [address, setAddress] = useState({
    addressLine: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    landmark: "",
    addressType: "home",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (key, value) =>
    setAddress((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    // Validation example
    if (!address.addressLine || !address.city || !address.pincode) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      // Call API to save the address
      const savedAddress = await addUserAddress(address, user.token);

      // If API returns the saved address
      onSave(savedAddress);
    } catch (err) {
      Alert.alert("Error", "Could not save address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal} onPress={() => {}}>
          <Text style={styles.title}>Add Address</Text>

          <AddressForm address={address} onChange={onChange} />

          <TouchableOpacity
            style={[styles.btn, loading && styles.disabledBtn]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>Save Address</Text>
            )}
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    maxHeight: "70%",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },

  btn: {
    marginTop: 16,
    backgroundColor: "#FF7A00",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  disabledBtn: {
    backgroundColor: "#ccc",
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
