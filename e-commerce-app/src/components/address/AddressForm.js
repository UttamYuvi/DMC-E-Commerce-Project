import { StyleSheet, TextInput, View } from "react-native";

function AddressForm({ address, onChange }) {
  return (
    <>
      <TextInput
        placeholder="Address Line"
        value={address.addressLine}
        onChangeText={(v) => onChange("addressLine", v)}
        style={styles.input}
      />

      <TextInput
        placeholder="Landmark"
        value={address.landmark}
        onChangeText={(v) => onChange("landmark", v)}
        style={styles.input}
      />

      <View style={styles.row}>
        <TextInput
          placeholder="City"
          value={address.city}
          onChangeText={(v) => onChange("city", v)}
          style={[styles.input, styles.half]}
        />
        <TextInput
          placeholder="State"
          value={address.state}
          onChangeText={(v) => onChange("state", v)}
          style={[styles.input, styles.half]}
        />
      </View>

      <TextInput
        placeholder="Pincode"
        keyboardType="number-pad"
        maxLength={6}
        value={address.pincode}
        onChangeText={(v) => onChange("pincode", v)}
        style={styles.input}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  half: {
    width: "48%",
  },
});

export default AddressForm;
