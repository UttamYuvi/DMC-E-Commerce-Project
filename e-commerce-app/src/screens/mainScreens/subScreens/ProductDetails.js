import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
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
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={commonStyles.title}>Product Details</Text>
      </View>

      {/* IMAGE CAROUSEL */}
      <View style={styles.carouselContainer}>
        <FlatList
          data={imagesArray}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `img-${index}`}
          renderItem={({ item }) => (
            <Image
              source={{ uri: `${config.url}/uploads/products/${item}` }}
              style={styles.carouselImage}
              resizeMode="cover"
            />
          )}
        />
      </View>

      {/* PRODUCT DETAILS */}
      <ScrollView
        style={styles.detailsContainer}
        // showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Text style={styles.productTitle}>{product.name}</Text>
        <Text style={styles.price}>₹ {product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>

      {/* ACTION BUTTONS */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>

        <AddToCartButton product={product} style={styles.addToCartButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#a2f5f3",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },

  carouselContainer: {
    margin: 15,
    marginHorizontal:10,
    height: 320,
    borderRadius:10
  },

  carouselImage: {
    width: width,
    height: 320,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },

  detailsContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
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

  addToCartButton: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 12,
  },
});

export default ProductDetails;
