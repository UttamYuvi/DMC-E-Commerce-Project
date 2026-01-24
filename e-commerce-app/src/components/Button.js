import { StyleSheet, Text, TouchableOpacity } from "react-native";

function Button({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a155f",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Button;
