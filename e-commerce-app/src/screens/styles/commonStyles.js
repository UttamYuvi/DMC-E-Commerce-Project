// import { StyleSheet } from "react-native";

// export const commonStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 0,
//     paddingTop: 0,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   innerContainer: {
//     flex: 1,
//     backgroundColor: "pink",
//   },
//   input: {
//     borderRadius: 5,
//     backgroundColor: "white",
//     padding: 15,
//   },
//   // Products
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     overflow: "hidden",
//     elevation: 3,
//     margin: 10,
//     width: "45%",
//   },
//   image: { width: "100%", height: 150 },
//   info: { padding: 10 },
//   title: { fontSize: 16, fontWeight: "bold" },
//   price: { color: "#888", marginVertical: 5 },
//   // button: {
//   //   backgroundColor: "#a2f5f3",
//   //   padding: 10,
//   //   borderRadius: 5,
//   //   alignItems: "center",
//   // },
//   buttonText: { color: "#fff", fontWeight: "bold" },
// });
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 10;
const NUM_COLUMNS = 2;
const CARD_WIDTH = (width - CARD_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    margin: CARD_MARGIN / 2,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },

  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },

  info: {
    padding: 12,
  },

  productTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },

  description: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: "800",
    color: "#16A34A",
  },

  button: {
    backgroundColor: "#FF7A00",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    marginHorizontal: 12,
    marginBottom: 12,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
