import { View, StyleSheet } from "react-native";
import PlaceTitle from "../components/PlaceTitle";
import PlaceDescription from "../components/PlaceDescription";
import ImageCarousel from "../components/ImageCarousel";
import Socials from "../components/Socials";
import RouteTraceButton from "../components/RouteTraceButton";

const PlaceView = ({ navigation, route }) => {
  
  const { placeData } = route.params; 

  const image = { source: {uri: placeData['image_one']}}

  const images = [
    { source: {uri: placeData['image_one']} },
    { source: {uri: placeData['image_two']} },
    { source: {uri: placeData['image_three']} }
  ];

  return (
    <View style={styles.container}>
      <PlaceTitle
        title={placeData['name']}
        category={placeData['category']}
        image={image}
      />

      <PlaceDescription description={placeData['description']} />

      <View style={styles.carouselContainer}>
        <ImageCarousel images={images}/>
      </View>

      <Socials onFavorite={() => {}} onShare={() => {}} />

      <RouteTraceButton onPress={() => {}}/>
    </View>
  );
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
});

export default PlaceView;
