import React, { useState, useRef } from "react";
import { View, Image, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

const ImageCarousel = ({ images }) => {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.source} style={styles.image} />
    </View>
  );

  return (
    <View>
      <View>
        <Carousel
          ref={carouselRef}
          data={images}
          renderItem={renderCarouselItem}
          sliderWidth={450}
          itemWidth={400}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
      </View>
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.paginationInactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
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
  paginationContainer: {
    paddingVertical: 8,
    marginVertical: 10
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: "#000000",
  },
  paginationInactiveDot: {
    backgroundColor: "#CCCCCC",
  },
});

export default ImageCarousel;
