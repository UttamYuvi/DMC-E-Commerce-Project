import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import { config } from "../../../services/config";
import AddToCartButton from "../../../components/AddToCartButton";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

function ProductDetails({ route, navigation }) {
  const { product } = route.params;
  const cart = useSelector((state) => state.cart.items);
  const imagesArray = product.images?.split(",") || [];

  return (
    <View style={commonStyles.container}>
      <View style={styles.carouselContainer}>
        <FlatList
          data={imagesArray}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: `${config.url}/uploads/products/${item}` }}
              style={styles.carouselImage}
              resizeMode="cover"
            />
          )}
        />
      </View>

      <ScrollView
        style={styles.detailsContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Text style={styles.productTitle}>{product.name}</Text>
        <Text style={styles.price}>₹ {product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>
      <View style={styles.actionsContainer}>
        {/* <TouchableOpacity
          onPress={() => {
            if (cart.length > 0) {
              navigation.navigate("Cart", {
                screen: "Checkout",
              });
            } else {
              Toast.show({
                type: "error",
                position: "bottom",
                text1: "Your cart is empty 🛒",
                text2: "Add a product to continue with your purchase.",
              });
            }
          }}
          style={styles.buyButton}
        >
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity> */}

        <AddToCartButton product={product} style={{ flex: 1 }} />
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   homeHeader: {
//     backgroundColor: "red",
//     padding: 20,
//     paddingTop: 45,
//   },
//   carouselContainer: {
//     height: 300,
//   },

//   carouselImage: {
//     width: width,
//     height: 300,
//   },

//   detailsContainer: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#FFFFFF",
//   },

//   title: {
//     fontSize: 20,
//     fontWeight: "600",
//     marginBottom: 6,
//     includeFontPadding: false,
//   },

//   price: {
//     fontSize: 18,
//     fontWeight: "500",
//     marginBottom: 10,
//     includeFontPadding: false,
//     color: "#888",
//   },

//   description: {
//     fontSize: 14,
//     lineHeight: 20,
//     marginBottom: 6,
//     includeFontPadding: false,
//   },
//   buyButton: {
//     borderWidth: 1,
//     borderColor: "#a2f5f3",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     width: "45%",
//   },
//   buyButtonText: {
//     color: "#a2f5f3",
//     fontWeight: "bold",
//   },
//   button: {
//     backgroundColor: "#a2f5f3",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     width: "50%",
//   },
// });

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 20,
    marginHorizontal: 0,
    height: 400,
  },

  carouselImage: {
    width: width,
    height: 400,
  },

  detailsContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    marginTop: -15,
    marginHorizontal: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,
    elevation: 3,
  },

  productTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginTop: 16,
    marginBottom: 6,
  },

  price: {
    fontSize: 20,
    fontWeight: "800",
    color: "#16A34A",
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
    marginBottom: 20,
  },

  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#a2f5f3",
    borderTopWidth: 0.5,
    borderTopColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
    elevation: 3,
  },

  buyButton: {
    backgroundColor: "#33a00e",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },

  buyButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ProductDetails;
