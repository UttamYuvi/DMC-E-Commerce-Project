import { Image, Text, TouchableOpacity, View } from "react-native";
import { commonStyles } from "../screens/styles/commonStyles";
import { config } from "../services/config";

import { useNavigation } from "@react-navigation/native";
import AddToCartButton from "./AddToCartButton";

function ProductCard({ item }) {
  const navigate = useNavigation();
  const img = `${config.url}/uploads/products/${item.images.split(",")[0]}`;
  const prodMaxLength = 18;
  const name =
    item.name.length > prodMaxLength
      ? item.name.substring(0, prodMaxLength) + "..."
      : item.name;
  const maxLength = 20;
  const desc =
    item.description.length > maxLength
      ? item.description.substring(0, maxLength) + "..."
      : item.description;

  return (
    <View style={commonStyles.card}>
      <TouchableOpacity
        onPress={() => navigate.navigate("ProductDetails", { product: item })}
      >
        <Image
          source={{
            uri: img,
          }}
          style={commonStyles.image}
        />
        <View style={commonStyles.info}>
          <Text style={commonStyles.title}>{name}</Text>
          <Text style={commonStyles.price}>{desc}</Text>
          <Text style={commonStyles.price}>${item.price}</Text>
        </View>
      </TouchableOpacity>

      <AddToCartButton product={item} style={{ width: "100%" }} />
    </View>
  );
}

export default ProductCard;
