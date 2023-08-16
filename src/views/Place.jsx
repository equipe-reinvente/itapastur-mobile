import { View, Image, StyleSheet } from "react-native";
import { Button, Text } from "@react-native-material/core";

const PlaceView = () => {
  const description = `A pedra do frade é cercada por lendas. Conta-se por exemplo,
  que a pedra é a morada de uma princesa encantada, e que é impossível subir até seu topo.`;

  const images = ['Imagem1', 'Imagem2', 'Imagem3', 'Imagem4', 'Imagem5'];

  return (
    <View>
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
        {images.map((image) => (
          <Text key={image}>{image}</Text>
        ))}
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 20
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
    margin: 20,
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
