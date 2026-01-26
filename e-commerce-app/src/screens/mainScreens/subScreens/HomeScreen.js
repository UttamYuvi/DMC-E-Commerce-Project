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
import ProductCard from "../../../components/ProductCard";

function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    loadProducts();
    const cat = await getAllCategories();
    const sub = await getAllSubCategories();
    setCategories(cat || []);
    setSubCategories(sub || []);
  };
  console.log("categories",categories)

  const loadProducts = async (refresh = false) => {
    if (loading) return;
    if (!hasMore && !refresh) return;

    setLoading(true);
    const currentPage = refresh ? 0 : page;
    const result = await getAllProducts(currentPage, 6);

    if (result && !result.empty) {
      setProducts((prev) =>
        refresh ? result.content : [...prev, ...result.content]
      );
      setHasMore(!result.last);
      setPage(refresh ? 1 : page + 1);
    }

    setLoading(false);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setHasMore(true);
    setPage(0);
    loadProducts(true);
  };

  const openSubCategory = async (catId, subId) => {
    const allProducts = await getAllProductsBySubCatAndCat(catId, subId);
    navigation.navigate("ProductList", { allProducts });
  };

  /* ---------------- RENDERS ---------------- */

  const renderCategory = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.categoryPill}>
        <Text style={styles.categoryText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSubCategory = ({ item }) => {
    const img = `${config.url}/uploads/subcategories/${item.categoryName}/${item.image}`;
    return (
      <TouchableOpacity
        onPress={() =>
          openSubCategory(item.categoryId, item.subCategoryId)
        }
      >
        <View style={styles.subCatCard}>
          <Image source={{ uri: img }} style={styles.subCatImage} />
          <Text style={styles.subCatName}>{item.subCategoryName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>Shop Infi</Text>
        <Text style={styles.subtitle}>Find what you love ❤️</Text>
      </View>

      {/* CATEGORIES */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item,index) => `cat-${item.categoryId}-${index}`}
        renderItem={renderCategory}
        contentContainerStyle={styles.categoryList}
      />

      {/* PRODUCTS */}
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item,index) => `product-${item.productId}-${index}`}
        renderItem={({ item }) => <ProductCard item={item} />}
        showsVerticalScrollIndicator={false}
        onEndReached={() => loadProducts()}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <>
            <Text style={styles.sectionTitle}>Popular Categories</Text>
            <FlatList
              data={subCategories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item,index) => `subcat-${item.subCategoryId}-${index}`}
              renderItem={renderSubCategory}
              contentContainerStyle={styles.subCatList}
            />

            <Text style={styles.sectionTitle}>Recommended Products for You</Text>
          </>
        }
      />
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a2f5f3",
  },

  header: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#a2f5f3",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  logo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1F2937",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: "#6B7280",
  },

  categoryList: {
    paddingTop:15,
    paddingBottom:30,
    paddingHorizontal: 10,
  },

  categoryPill: {
    backgroundColor: "#ffffff",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginHorizontal: 10,
    marginBottom:13,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 44,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  categoryText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
    color: "#374151"
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 12,
    marginBottom: 9,
    paddingHorizontal: 16,
  },

  subCatList: {
    paddingHorizontal: 12,
    marginVertical:10
  },

  subCatCard: {
    width: 140,
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 14,
    marginHorizontal: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },

  subCatImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E5E7EB",
  },

  subCatName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
});

export default HomeScreen;
