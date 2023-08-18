import { View, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";

const PlaceDescription = ({ description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Descrição</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  description: {
    color: "#999999"
  },
});

export default PlaceDescription;
