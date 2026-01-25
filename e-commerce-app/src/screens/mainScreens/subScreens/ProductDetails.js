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

const { width } = Dimensions.get("window");

function ProductDetails({ route }) {
  const { product } = route.params;
  const imagesArray = product.images?.split(",") || [];

  return (
    <View style={commonStyles.container}>
      <View style={styles.homeHeader}>
        <Text style={commonStyles.title}>Product details</Text>
      </View>
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
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>₹ {product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#FFFFFF",
        }}
      >
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>

        <AddToCartButton product={product} style={{ width: "50%" }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    // backgroundColor: "red",
    padding: 20,
    paddingTop: 45,
  },
  carouselContainer: {
    height: 300,
  },

  carouselImage: {
    width: width,
    height: 300,
  },

  detailsContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 6,
    includeFontPadding: false,
  },

  price: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
    includeFontPadding: false,
    color: "#888",
  },

  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
    includeFontPadding: false,
  },
  buyButton: {
    borderWidth: 1,
    borderColor: "#FF7A00",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "45%",
  },
  buyButtonText: {
    color: "#FF7A00",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FF7A00",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "50%",
  },
});

export default ProductDetails;
