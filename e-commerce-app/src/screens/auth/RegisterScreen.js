import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/Button";
import { commonStyles } from "../styles/commonStyles";

function RegisterScreen({ navigation }) {
  const onLogin = () => {
    // go back to the previous screen
    navigation.goBack();
  };

  const onSignup = () => {};
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Register</Text>
      <View style={commonStyles.innerContainer}>
        <TextInput
          style={commonStyles.input}
          placeholder="Email"
          keyboardType="email-address"
        />

        <TextInput
          style={[commonStyles.input, { marginTop: 20 }]}
          placeholder="Password"
          secureTextEntry={true}
        />

        <Text style={{ marginTop: 20 }}>
          Already have an account?{" "}
          <TouchableOpacity onPress={onLogin}>
            <Text>Signin here</Text>
          </TouchableOpacity>
        </Text>

        <View style={{ marginTop: 20 }}>
          <Button title={"Signup"} onPress={onSignup} />
        </View>
      </View>
    </View>
  );
}

export default RegisterScreen;
