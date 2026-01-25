import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    paddingTop: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "pink",
  },
  input: {
    borderRadius: 5,
    backgroundColor: "white",
    padding: 15,
  },
  // Products
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
    margin: 10,
    width: "45%",
  },
  image: { width: "100%", height: 150 },
  info: { padding: 10 },
  title: { fontSize: 16, fontWeight: "bold" },
  price: { color: "#888", marginVertical: 5 },
  // button: {
  //   backgroundColor: "#FF7A00",
  //   padding: 10,
  //   borderRadius: 5,
  //   alignItems: "center",
  // },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
