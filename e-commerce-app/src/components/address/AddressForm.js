import { ActivityIndicator, StyleSheet, TextInput, View } from "react-native";
import { fetchCityStateApi } from "../../services/auth";
import { useState } from "react";

function AddressForm({ address, onChange }) {
  const [loading, setLoading] = useState(false);
  const fetchCityState = async () => {
    if (!address.pincode || address.pincode.length !== 6) return;

    setLoading(true);
    try {
      const result = await fetchCityStateApi(address.pincode);

      if (
        result &&
        result[0]?.Status === "Success" &&
        result[0]?.PostOffice?.length > 0
      ) {
        const postOffice = result[0].PostOffice[0];

        onChange("city", postOffice.District);
        onChange("state", postOffice.State);
      }
    } catch (error) {
      console.log(error);
      onChange("city", "");
      onChange("state", "");
    } finally {
      setLoading(false);
    }
  };

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

      <TextInput
        placeholder="Pincode"
        keyboardType="number-pad"
        maxLength={6}
        value={address.pincode}
        onChangeText={(v) => onChange("pincode", v)}
        onBlur={fetchCityState}
        style={styles.input}
      />

      <View style={styles.row}>
        {/* City */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="City"
            value={address.city}
            editable={!loading}
            onChangeText={(v) => onChange("city", v)}
            style={[styles.input, styles.inputWithLoader]}
          />
          {loading && <ActivityIndicator size="small" style={styles.loader} />}
        </View>

        {/* State */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="State"
            value={address.state}
            editable={!loading}
            onChangeText={(v) => onChange("state", v)}
            style={[styles.input, styles.inputWithLoader]}
          />
          {loading && <ActivityIndicator size="small" style={styles.loader} />}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputWrapper: {
    width: "48%",
    position: "relative",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: "#fafafa",
    marginVertical: 5,
  },

  inputWithLoader: {
    paddingRight: 40, // space for loader
  },

  loader: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
});

export default AddressForm;
