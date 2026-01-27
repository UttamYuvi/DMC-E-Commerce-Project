import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { useState } from "react";

function AddressModal({
  visible,
  addresses = [],
  onConfirm,
  onAddNew,
  onClose,
}) {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const selected = selectedId === item.addressId;

    return (
      <TouchableOpacity
        style={[styles.card, selected && styles.selectedCard]}
        onPress={() => setSelectedId(item.addressId)}
      >
        {/* Radio */}
        <View style={[styles.radio, selected && styles.radioSelected]}>
          {selected && <View style={styles.radioInner} />}
        </View>

        {/* Address Text */}
        <View style={styles.addressText}>
          <Text style={styles.type}>{item.addressType.toUpperCase()}</Text>
          <Text style={styles.line}>{item.addressLine}</Text>
          <Text style={styles.sub}>
            {item.city}, {item.state} - {item.pincode}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const selectedAddress = addresses.find((a) => a.addressId === selectedId);

  return (
    <Modal transparent visible={visible} animationType="slide">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal} onPress={() => {}}>
          <Text style={styles.title}>Choose Delivery Address</Text>

          {/* Address List */}
          {addresses.length > 0 ? (
            <FlatList
              data={addresses}
              keyExtractor={(item) => item.addressId.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.emptyText}>
              No address found. Please add one.
            </Text>
          )}

          {/* Add Address */}
          <TouchableOpacity onPress={onAddNew}>
            <Text style={styles.addText}>+ Add Address</Text>
          </TouchableOpacity>

          {/* Confirm */}
          <TouchableOpacity
            style={[styles.btn, !selectedAddress && styles.disabledBtn]}
            disabled={!selectedAddress}
            onPress={() => onConfirm(selectedAddress)}
          >
            <Text style={styles.btnText}>Use this Address</Text>
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
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: "85%",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },

  card: {
    flexDirection: "row",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },

  selectedCard: {
    borderColor: "#f97705",
    backgroundColor: "#f0f6ff",
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#999",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  radioSelected: {
    borderColor: "#f97705",
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#f97705",
  },

  addressText: {
    flex: 1,
  },

  type: {
    fontSize: 12,
    fontWeight: "600",
    color: "#f97705",
    marginBottom: 2,
  },

  line: {
    fontSize: 14,
    fontWeight: "500",
  },

  sub: {
    fontSize: 12,
    color: "#666",
  },

  addText: {
    color: "#f97705",
    fontWeight: "600",
    marginVertical: 12,
  },

  btn: {
    backgroundColor: "#f97705",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  disabledBtn: {
    backgroundColor: "#ccc",
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  emptyText: {
    textAlign: "center",
    color: "#777",
    marginVertical: 20,
  },
});

export default AddressModal;
