import { StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../styles/commonStyles";

function AccountScreen() {
  return (
    <View style={commonStyles.container}>
      <View style={styles.homeHeader}>
        <Text style={commonStyles.title}>AccountScreen Screen</Text>
      </View>
      <View></View>
      <View style={commonStyles.innerContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    backgroundColor: "red",
  },
});

export default AccountScreen;
