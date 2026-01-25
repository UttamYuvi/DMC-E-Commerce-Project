import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Button from "../../components/Button";
import { commonStyles } from "../styles/commonStyles";
import { useState } from "react";
import { registerUser } from "../../services/auth";

function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
  });

  const onChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const onSignup = async () => {
    console.log("Register payload:", form);
    const result = await registerUser(form);
    if (result.status == 200) {
      alert(result.data);
    }
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={commonStyles.title}>Create Account</Text>
      <Text style={styles.subTitle}>Sign up to continue shopping</Text>

      <View style={styles.innerContainer}>
        {/* First Name */}
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={form.firstName}
          onChangeText={(v) => onChange("firstName", v)}
        />

        {/* Last Name */}
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={form.lastName}
          onChangeText={(v) => onChange("lastName", v)}
        />

        {/* Mobile */}
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          maxLength={10}
          value={form.mobile}
          onChangeText={(v) => onChange("mobile", v)}
        />

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(v) => onChange("email", v)}
        />

        {/* Password */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={(v) => onChange("password", v)}
        />

        {/* Signup Button */}
        <View style={{ marginTop: 24 }}>
          <Button title="Sign Up" onPress={onSignup} />
        </View>

        {/* Login Redirect */}
        <Text style={styles.footerText}>
          Already have an account?
          <Text style={styles.link} onPress={() => navigation.goBack()}>
            {" "}
            Sign in
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  innerContainer: {
    marginTop: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fafafa",
    color: "#111",
  },

  button: {
    backgroundColor: "#FF7A00",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  subTitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fafafa",
    color: "#111",
  },

  footerText: {
    textAlign: "center",
    color: "#555",
    marginTop: 24,
    fontSize: 14,
  },

  link: {
    color: "#FF7A00",
    fontWeight: "600",
  },
});

export default RegisterScreen;
