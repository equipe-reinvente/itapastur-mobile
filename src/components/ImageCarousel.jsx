import { View, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const ImageCarousel = ({ images }) => {
  return (
    <Carousel
      data={images}
      renderItem={({ item }) => (
        <View style={styles.carouselItem}>
          <Image source={item.source} style={styles.image} />
        </View>
      )}
      sliderWidth={300}
      itemWidth={250}
    />
  )
}

const styles = StyleSheet.create({
  carouselItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default ImageCarousel;
