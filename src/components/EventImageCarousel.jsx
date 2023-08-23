import { Button } from "@react-native-material/core";
import React, { useState, useRef } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Image, StyleSheet, Text } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

const EventImageCarousel = ({ images=require("../images/imagePlaceholder.png"), 
                            style={marginHorizontal: 20}, 
                            sliderWidth=380, 
                            itemWidth=280, 
                            itemInfo={date: "29/11", time: "11:00"},
                            title }) => {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const styles = StyleSheet.create({
    carouselItem: style,
    image: {
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 20
    },
    paginationContainer: {
        position: 'relative',
        paddingVertical: 8,
        marginVertical: 10,
        left: 0,
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
    overlayContainer: {
        position: 'absolute', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    gradient: {
        position: "relative",
        height: "100%",
        width: "100%"
    },
    dateBackground: {
        position: 'relative',
        alignItems: 'flex-start',
        backgroundColor: "#1DAF6E", 
        height: 15,
        width: 50,
        top: -93,
        left: 10,
        borderRadius: 20
    },
    timeBackground: {
        position: 'relative',
        alignItems: 'flex-start',
        backgroundColor: "#1DAF6E", 
        height: 15,
        width: 50,
        top: -108,
        left: 215,
        borderRadius: 20
    },  
    button: {
        position: 'relative',
        height: '100%',
        width: '100%',
        top: -133,
        borderRadius: 15
    },
    buttonContainer: {
        position: 'relative',
        height: '100%',
        width: '100%',
        top: -26,
        borderRadius: 15
    },
    buttonContentContainer: {
        position: 'relative',
        height: '100%',
        width: '100%',
        borderRadius: 15
    },
    buttonPressable: {
        position: 'relative',
        height: '100%',
        width: '100%',
        borderRadius: 15
    },
    infoText: {
        position: 'relative',
        fontWeight: 'bold',
        fontSize: 10,
        left: 10,
        top: -13,
        marginLeft: 5
    },
    infoIcon: {
        position: 'relative',
        marginLeft: 1,
        marginTop: 1
    },
    titleContainer: {
        position: 'relative',
        top: -70,
        left: 10
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
  });

  const renderCarouselItem = ({ item, index }) => (
    <View style={styles.carouselItem}>
        <Image source={item.source} style={styles.image} />
        <View style={styles.overlayContainer}>
            <Image source={require("../images/gradient2.png")} style={styles.gradient} />
            <View style={styles.dateBackground}>
                <MaterialCommunityIcons
                    name={"calendar-blank"}
                    size={12}
                    color={"black"}
                    style={styles.infoIcon}
                />
                <Text style={styles.infoText}>{itemInfo[index]['date']}</Text>
            </View>
            <View style={styles.timeBackground}>
                <MaterialCommunityIcons
                    name={"clock-outline"}
                    size={12}
                    color={"black"}
                    style={styles.infoIcon}
                />
                <Text style={styles.infoText}>{itemInfo[index]['time']}</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button style={styles.button} 
                    contentContainerStyle={styles.buttonContentContainer} 
                    pressableContainerStyle={styles.buttonPressable} 
                    color='rgba(255, 255, 255, 0)'
                    disableElevation />
            </View>
        </View>
    </View>
  );

  return (
    <View>
      <View>
        <Carousel
          ref={carouselRef}
          data={images}
          renderItem={renderCarouselItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
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
  );
}

export default EventImageCarousel;
