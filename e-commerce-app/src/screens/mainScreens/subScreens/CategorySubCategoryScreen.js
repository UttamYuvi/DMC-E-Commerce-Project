import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { commonStyles } from "../../styles/commonStyles";
import {
  getAllCategories,
  getAllSubCategoriesByCategory,
} from "../../../services/categories";
import { config } from "../../../services/config";
import { getAllProductsBySubCatAndCat } from "../../../services/products";

function CategorySubCategoryScreen({ navigation }) {
  const [cateogries, setCategories] = useState([]);
  const [subCateogries, setSubCategories] = useState([]);

  const loadAllCategories = async () => {
    const result = await getAllCategories();
    setCategories(result);
  };

  useEffect(() => {
    loadAllCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    const result = await getAllSubCategoriesByCategory(categoryId);
    setSubCategories(result);
  };

  const renderCategories = ({ item }) => {
    const img = `${config.url}/uploads/categories/${item.image}`;
    return (
      <TouchableOpacity onPress={() => handleCategoryClick(item.categoryId)}>
        <View style={styles.categoryItem}>
          <Image
            source={{
              uri: img,
            }}
            style={styles.image}
          />
          <Text style={styles.categoryName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleSubCategoryClick = async (cat, subcat) => {
    const result = await getAllProductsBySubCatAndCat(cat, subcat);
    if (result?.length !== 0) {
      navigation.navigate("ProductList", { allProducts: result });
    } else {
      alert("Products has been sold for this category");
    }
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

          <Text style={{ textAlign: "center", marginTop: 5, backgroundColor:"#a2f5f3", borderRadius:10, padding:5 }}>
            {item.subCategoryName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={commonStyles.container}>
      <View style={styles.homeHeader}>
        <Text style={commonStyles.title}>Categories</Text>
      </View>
      <View style={styles.viewContainer}>
        <View style={styles.categoryContainer}>
          <FlatList
            data={cateogries}
            keyExtractor={(item, index) => `${item.categoryId}-${index}`}
            renderItem={renderCategories}
          />
        </View>
        <View style={styles.subCategoryContainer}>
          <Text style={styles.subCatHead}>You are looking for...</Text>
          <FlatList
            data={subCateogries}
            keyExtractor={(item, index) => `${item.subCategoryId}-${index}`}
            renderItem={renderSubCategories}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   homeHeader: {
//     // backgroundColor: "red",
//     padding: 20,
//     paddingTop: 45,
//   },
//   viewContainer: {
//     flex: 1,
//     flexDirection: "row",
//   },

//   categoryContainer: {
//     flex: 1,
//     backgroundColor: "white",
//   },

//   subCategoryContainer: {
//     flex: 3,
//     backgroundColor: "#FAFAFA",
//     padding: 10,
//   },

//   subCatHead: {
//     fontSize: 35,
//     fontWeight: 700,
//     color: "#888",
//   },
//   subCategoryItem: {
//     padding: 20,
//   },
//   subCatImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 20,
//   },

//   categoryItem: {
//     alignSelf: "center",
//     padding: 20,
//   },
//   categoryName: {
//     color: "black",
//     textAlign: "center",
//   },
//   text: {
//     color: "white",
//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 100,
//   },
// });

const styles = StyleSheet.create({
  homeHeader: {
    backgroundColor: "#a2f5f3",
    padding: 20,
    paddingTop: 45,
  },
  viewContainer: {
    flex: 1,
    flexDirection: "row",
  },

  categoryContainer: {
    flex: 1,
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: "#a2f5f3",
  },

  subCategoryContainer: {
    flex: 3,
    backgroundColor: "#ffffff",
    padding: 10,
  },

  subCatHead: {
    fontSize: 20,
    marginLeft: 18,
    fontWeight: 700,
    color: "#131212",
  },
  subCategoryItem: {
    padding: 20,
  },
  subCatImage: {
    // backgroundColor: "#a2f5f3",
    width: 100,
    height: 100,
    borderRadius: 20,
  },

  categoryItem: {
    alignSelf: "center",
    padding: 20,
  },
  categoryName: {
    color: "black",
    textAlign: "center",
  },
  text: {
    color: "white",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
});

export default CategorySubCategoryScreen;
