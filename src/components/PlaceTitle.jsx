import { View, Image, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";

const PlaceTitle = ({ title, category, image }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <Image source={image.source} style={styles.image} />
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
