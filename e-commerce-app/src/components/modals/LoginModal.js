import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { loginUser } from "../../services/auth";
import { AuthContext } from "../../context/AuthContext";

function LoginModal({ visible, onClose }) {
  //   const { setUser } = useContext(AuthContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    const success = await dispatch(loginUser({ email, password }));
    if (success) {
      onClose(true); // login success
    }
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
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
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});

export default LoginModal;
