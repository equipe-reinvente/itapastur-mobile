import { View, Image, StyleSheet } from "react-native";
import { Button, Text } from "@react-native-material/core";
import ImageCarousel from "../components/ImageCarousel";

const PlaceView = () => {
  const description = `A pedra do frade é cercada por lendas. Conta-se por exemplo,
  que a pedra é a morada de uma princesa encantada, e que é impossível subir até seu topo.`;

  const images = [
    { source: require("../assets/PedraDoFrade.jpg") },
    { source: require("../assets/PedraDoFrade.jpg") },
    { source: require("../assets/PedraDoFrade.jpg") },
    { source: require("../assets/PedraDoFrade.jpg") }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleTextContainer}>
          <Text style={styles.title}>Pedra do Frade</Text>
          <Text style={styles.category}>Ponto turístico</Text>
        </View>
        <Image
          source={require("../assets/PedraDoFrade.jpg")}
          style={styles.logo}
        />
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Descrição</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View>
        <ImageCarousel images={images}/>
      </View>

      <View>
        <Text>Like</Text>
        <Text>Share</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title={"TRAÇAR ROTA"}
          style={styles.button}
          titleStyle={styles.buttonText}
          color="#1daf6e"
          contentContainerStyle={{height: 50}}
          onPress={() => {}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 20
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  titleTextContainer: {
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
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  descriptionContainer: {
    marginVertical: 20,
  },
  descriptionTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  description: {
    color: "#999999"
  },
  buttonContainer: {
    marginBottom: 90
  },
  button: {
    width: 350,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16
  }
});

export default PlaceView;
