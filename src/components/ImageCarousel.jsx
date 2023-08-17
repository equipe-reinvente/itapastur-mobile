import { View, Image, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

const ImageCarousel = ({ images }) => {
  return (
    <Carousel
      data={images}
      renderItem={({ item }) => (
        <View style={styles.carouselItem}>
          <Image source={item.source} style={styles.image} />
        </View>
      )}
      sliderWidth={450}
      itemWidth={400}
    />
  )
}

const styles = StyleSheet.create({
  carouselItem: {
    marginHorizontal: 20,
    width: 350,
    height: 250
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20
  },
});

export default ImageCarousel;
