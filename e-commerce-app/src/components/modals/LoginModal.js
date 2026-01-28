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
import Toast from "react-native-toast-message";

function LoginModal({ visible, onClose, onOpenClose }) {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
  const success = await loginUser(email, password);

  if (success.status === "success") {
    login(success);
    Toast.show({ type: 'success', text1: 'Login successful 🎉' });

  } else if (success.status === "error") {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: "You're not registered yet",
      text2: "Please register to continue",
    });
    navigation.navigate("Register")
  }
  onClose();
};

  return (
    <Modal transparent visible={visible} animationType="slide">
      {/* Overlay - click outside */}
      <Pressable style={styles.overlay} onPress={() => onOpenClose(false)}>
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
            <Text style={styles.btnText}>Sign In</Text>
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
    backgroundColor: "#f97705",
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
    color: "#f97705",
    fontWeight: "600",
  },
});

export default LoginModal;
