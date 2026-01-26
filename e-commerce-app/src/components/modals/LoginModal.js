import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { loginUser } from "../../services/auth";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginModal({ visible, onClose }) {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);    

  const onLogin = async () => {
    try {
      const success = await loginUser(email, password);
    if (success?.role == "USER") {
      console.log("success",success)
      login(success)
      // const { email, token } = success;
      // console.log("success:", email, token);
      onClose(true)

      // await AsyncStorage.setItem("username", email);
      // await AsyncStorage.setItem("token", token);
      // login(success);
      // onClose(true);
    }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      {/* Overlay - click outside */}
      <Pressable style={styles.overlay} onPress={() => onClose(false)}>
        {/* Modal box - stop closing on press */}
        <Pressable style={styles.modal} onPress={() => {}}>
          <Text style={styles.title}>Login</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <TouchableOpacity style={styles.btn} onPress={onLogin}>
            <Text style={styles.btnText}>{loading ? "Signing in..." : "Sign In"}</Text>
          </TouchableOpacity>

          <Text style={styles.linkText}>
            New user?
            <Text
              style={styles.link}
              onPress={() => {
                onClose(false);
                navigation.navigate("Register");
              }}
            >
              {" "}
              Register
            </Text>
          </Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  modal: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#222",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 12,
    color: "#000",
  },

  btn: {
    backgroundColor: "#FF7A00",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  linkText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
    color: "#555",
  },

  link: {
    color: "#FF7A00",
    fontWeight: "600",
  },
});

export default LoginModal;
