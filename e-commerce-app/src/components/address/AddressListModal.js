import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

export default function AddressListModal({
  visible,
  addresses,
  onAddAddress,
  onConfirm,
  onClose,
}) {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <Modal transparent visible={visible} animationType="slide">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal}>
          <Text style={styles.title}>Select Address</Text>

          {/* NO ADDRESS CASE */}
          {addresses.length === 0 ? (
            <TouchableOpacity onPress={onAddAddress}>
              <Text style={styles.addText}>+ Add address</Text>
            </TouchableOpacity>
          ) : (
            <>
              {/* RADIO LIST */}
              {addresses.map((item) => (
                <TouchableOpacity
                  key={item.addressId}
                  onPress={() => setSelectedId(item.addressId)}
                  style={[
                    styles.card,
                    selectedId === item.addressId && styles.activeCard,
                  ]}
                >
                  <View style={styles.radioOuter}>
                    {selectedId === item.addressId && (
                      <View style={styles.radioInner} />
                    )}
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text>{item.addressLine}</Text>
                    <Text style={styles.meta}>
                      {item.city}, {item.state} - {item.pincode}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

              {/* ADD ADDRESS */}
              <TouchableOpacity onPress={onAddAddress}>
                <Text style={styles.addText}>+ Add address</Text>
              </TouchableOpacity>

              {/* CONFIRM */}
              <TouchableOpacity
                style={styles.btn}
                disabled={!selectedId}
                onPress={() =>
                  onConfirm(addresses?.find((a) => a.addressId === selectedId))
                }
              >
                <Text style={styles.btnText}>Use this Address</Text>
              </TouchableOpacity>
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
