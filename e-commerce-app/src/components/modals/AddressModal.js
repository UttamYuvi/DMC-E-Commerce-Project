import { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

function AddressModal({ visible, onConfirm }) {
  //   const addresses = useSelector((state) => state.address.list);
  const [manualAddress, setManualAddress] = useState("");
  const [selected, setSelected] = useState(null);

  const submitAddress = () => {
    onConfirm(selected || manualAddress);
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Delivery Address</Text>

          {/* {addresses.length > 0 ? (
            <FlatList
              data={addresses}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setSelected(item)}
                  style={[
                    styles.addressItem,
                    selected?.id === item.id && styles.selected,
                  ]}
                >
                  <Text>{item.address}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <TextInput
              placeholder="Enter delivery address"
              value={manualAddress}
              onChangeText={setManualAddress}
              style={styles.input}
              multiline
            />
          )} */}

          <TouchableOpacity style={styles.btn} onPress={submitAddress}>
            <Text style={styles.btnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});

export default AddressModal;
