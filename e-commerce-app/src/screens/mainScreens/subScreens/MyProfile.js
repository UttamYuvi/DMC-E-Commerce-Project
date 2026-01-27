// import { useNavigation } from '@react-navigation/core'
import React, { useContext, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { updateUserProfile } from "../../../services/profile";
import { AuthContext } from "../../../context/AuthContext";

function MyProfile() {
  const { user } = useContext(AuthContext);

  const [firstName, setFirstName] = useState(user.firstname);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);
  const [gender, setGender] = useState(user.gender);

  console.log("userrrrrrrr", user);

  const onUpdate = async () => {
    const payload = {
      firstName,
      lastName,
      mobile,
    };

    console.log("Updated Profile:", payload);
    try {
      const result = await updateUserProfile(payload, user.token);
      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />

        {/* Last Name */}
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          editable={false}
          style={[styles.input, styles.disabledInput]}
        />

        {/* Mobile */}
        <Text style={styles.label}>Mobile</Text>
        <TextInput
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          style={styles.input}
        />

        {/* Gender (Disabled) */}
        <Text style={styles.label}>Gender</Text>
        <TextInput
          value={gender}
          editable={false}
          style={[styles.input, styles.disabledInput]}
        />

        <TouchableOpacity style={styles.updateBtn} onPress={onUpdate}>
          <Text style={styles.updateText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a2f5f3",
  },

  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#a2f5f3",
  },

  backText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#055052",
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#033f40",
  },

  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#055052",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#c7eeee",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#000",
    marginBottom: 14,
    backgroundColor: "#f8ffff",
  },

  disabledInput: {
    backgroundColor: "#eefafa",
    color: "#777",
  },

  updateBtn: {
    backgroundColor: "#f08205",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  updateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default MyProfile;
