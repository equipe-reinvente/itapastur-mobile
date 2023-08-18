import { View, StyleSheet } from "react-native";
import { Button, Text } from "@react-native-material/core";
import { IconButton } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PlaceTitle from "../components/PlaceTitle";
import PlaceDescription from "../components/PlaceDescription";
import ImageCarousel from "../components/ImageCarousel";

const PlaceView = () => {
  const description = `A pedra do frade é cercada por lendas. Conta-se por exemplo,
  que a pedra é a morada de uma princesa encantada, e que é impossível subir até seu topo.`;

  const image = { source: require("../assets/PedraDoFrade.jpg")}

  const images = [
    { source: require("../assets/PedraDoFrade.jpg") },
    { source: require("../assets/PedraDoFrade.jpg") },
    { source: require("../assets/PedraDoFrade.jpg") },
    { source: require("../assets/PedraDoFrade.jpg") }
  ];

  return (
    <View style={styles.container}>
      <PlaceTitle
        title={"Pedra do Frade"}
        category={"Ponto turístico"}
        image={image}
      />

      <PlaceDescription description={description} />

      <View style={styles.carouselContainer}>
        <ImageCarousel images={images}/>
      </View>

      <View style={styles.likeAndShareButtonsContainer}>
        <IconButton
          icon={() => (
            <MaterialCommunityIcons
              name={'heart-outline'}
              size={25}
              color={"#000000"}
            />
          )}
          style={styles.likeAndShareButton}
          onPress={() => {}}
        />
        <IconButton
          icon={() => (
            <MaterialCommunityIcons
              name={'share-variant'}
              size={25}
              color={"#000000"}
            />
          )}
          style={styles.likeAndShareButton}
          onPress={() => {}}
        />
      </View>

      <View style={styles.routeButtonContainer}>
        <Button
          title={"TRAÇAR ROTA"}
          trailing={() => (
            <MaterialCommunityIcons
              name={'car'}
              size={30}
              color={"#FFFFFF"}
            />
          )}
          style={styles.routeButton}
          titleStyle={styles.routeButtonText}
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
  carouselContainer: {
    width: 450,
    height: 180,
    marginBottom: 90
  },
  likeAndShareButtonsContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: -35,
    marginBottom: 10,
    marginLeft: 10,
  },
  likeAndShareButton: {
    height: 35,
    width: 35,
    marginHorizontal: 3,
    borderRadius: 10,
    backgroundColor: "#1daf6e"
  },
  routeButtonContainer: {
    marginTop: 100
  },
  routeButton: {
    width: 350,
  },
  routeButtonText: {
    color: "#FFFFFF",
    fontSize: 16
  }
});

export default PlaceView;
