import { View, Image, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";

const PlaceTitle = ({ title, category, image }) => {
  try {
    if (image.source.uri == null) image.source = require("../images/imagePlaceholder.png");
  } catch {}
  
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      {image.source !== null && <Image source={image.source} style={styles.image} />}
      {image.source === null && <Image source={require("../images/imagePlaceholder.png")} style={styles.image} />}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  category: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#999999"
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
});

export default PlaceTitle;
