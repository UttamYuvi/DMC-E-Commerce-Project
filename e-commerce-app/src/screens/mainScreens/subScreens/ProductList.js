import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import { config } from "../../../services/config";
import ProductCard from "../../../components/ProductCard";

function ProductList({ route, navigation }) {
  const { allProducts } = route.params;


  return (
    <View style={commonStyles.container}>
      <View style={styles.homeHeader}>
        <Text style={commonStyles.title}>Products</Text>
      </View>
      {/* <View style={styles.viewContainer}> */}
      <View style={styles.productContainer}>
        <FlatList
          data={allProducts}
          keyExtractor={(item, index) => `${item.productId}-${index}`}
          renderItem={({ item }) => <ProductCard item={item} />}
          numColumns={2}
        />
      </View>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    // backgroundColor: "red",
    padding: 20,
    paddingTop: 45,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  productContainer: {
    flex: 1,
  },
});

export default ProductList;
