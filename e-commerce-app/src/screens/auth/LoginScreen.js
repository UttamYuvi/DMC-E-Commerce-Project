import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/Button";
import { useContext, useState } from "react";
import { commonStyles } from "../styles/commonStyles";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../services/auth";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const onRegister = () => {
    // navigate to Register Screen
    // navigation.navigate('Register')
    navigation.push("Register");
  };

  const onSignin = async () => {
    if (email.length == 0) {
      alert("please enter email");
    } else if (password.length == 0) {
      alert("please enter password");
    } else {
      const result = await loginUser(email, password);
      login(result);
      // navigation.navigate("Home");
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Welcome Back!!</Text>
      <View style={commonStyles.innerContainer}>
        <TextInput
          onChangeText={setEmail}
          style={commonStyles.input}
          placeholder="Email"
          keyboardType="email-address"
        />

        <TextInput
          onChangeText={setPassword}
          style={[commonStyles.input, { marginTop: 20 }]}
          placeholder="Password"
          secureTextEntry={true}
        />

        <Text style={{ marginTop: 20 }}>
          Don't have an account?{" "}
          <TouchableOpacity onPress={onRegister}>
            <Text>Signup here</Text>
          </TouchableOpacity>
        </Text>

        <View style={{ marginTop: 20 }}>
          <Button title={"Signin"} onPress={onSignin} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

export default LoginScreen;
