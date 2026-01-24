import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useEffect, useState } from "react";
import {
  getAllCategories,
  getAllSubCategories,
} from "../../../services/categories";
import {
  getAllProducts,
  getAllProductsBySubCatAndCat,
} from "../../../services/products";
import { config } from "../../../services/config";
import { commonStyles } from "../../styles/commonStyles";
import ProductCard from "../../../components/ProductCard";

function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [cateogries, setCategories] = useState([]);
  const [subCateogries, setSubCategories] = useState([]);

  const loadAllCategories = async () => {
    const result = await getAllCategories();
    setCategories(result);
  };

  const loadAllSubCategories = async () => {
    const result = await getAllSubCategories();
    setSubCategories(result);
  };

  const loadAllProducts = async (isRefresh = false) => {
    if (loading) return;
    if (!hasMore && !isRefresh) return;

    setLoading(true);

    const currentPage = isRefresh ? 0 : page;
    const result = await getAllProducts(currentPage, 4);
    if (!result.empty) {
      setProducts((prev) =>
        isRefresh ? result.content : [...prev, ...result.content],
      );
      setHasMore(!result.last);
      setPage(isRefresh ? 1 : page + 1);
    }

    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadAllProducts();
    loadAllCategories();
    loadAllSubCategories();
  }, []);

  const onRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    setHasMore(true);
    setPage(0);
    loadAllProducts(true);
  };

  const renderCategories = ({ item }) => (
    <View style={styles.categoryItem}>
      <Text style={styles.categoryName}>{item.name}</Text>
    </View>
  );

  const handleSubCategoryClick = async (cat, subcat) => {
    const allProducts = await getAllProductsBySubCatAndCat(cat, subcat);
    navigation.navigate("ProductList", { allProducts: allProducts });
  };

  const renderSubCategories = ({ item }) => {
    const img = `${config.url}/uploads/subcategories/${item.categoryName}/${item.image}`;
    return (
      <TouchableOpacity
        onPress={() =>
          handleSubCategoryClick(item.categoryId, item.subCategoryId)
        }
      >
        <View style={styles.subCategoryItem}>
          <Image
            source={{
              uri: img,
            }}
            style={styles.subCatImage}
          />

          <Text style={{ textAlign: "center", marginTop: 5 }}>
            {item.subCategoryName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={commonStyles.container}>
      <View style={styles.homeHeader}>
        <Text style={commonStyles.title}>ShopInfi</Text>
      </View>
      <View>
        <FlatList
          data={cateogries}
          keyExtractor={(item, index) => `${item.categoryId}-${index}`}
          renderItem={renderCategories}
          horizontal
        />
      </View>

      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={(item, index) => `${item.productId}-${index}`}
        renderItem={({ item }) => <ProductCard item={item} />}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={() => {
          if (!loading && !refreshing && hasMore) {
            loadAllProducts();
          }
        }}
        onEndReachedThreshold={0.6}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews={true}
        ListHeaderComponent={
          <>
            {/* Sub Categories */}
            <FlatList
              data={subCateogries}
              keyExtractor={(item, index) => `${item.subCategoryId}-${index}`}
              renderItem={renderSubCategories}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    // backgroundColor: "red",
    padding: 20,
    paddingTop: 45,
  },
  item: {
    padding: 12,
    marginVertical: 6,
    marginTop: 500,
  },
  subCategoryItem: {
    backgroundColor: "#FAFAFA",
    padding: 20,
  },
  subCatImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  categoryItem: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 12,
    paddingHorizontal: 30,
  },
  categoryName: {
    color: "black",
  },
  text: {
    color: "white",
  },
  // product card
  productsContainer: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
  },
});

export default HomeScreen;
