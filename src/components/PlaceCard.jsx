import { Button } from "@react-native-material/core";
import React, { useState, useRef, useEffect } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Image, StyleSheet, Text } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

const PlaceCard = ({ image=require("../images/imagePlaceholder.png"), 
                            style={position: "relative", borderRadius: 15, height: 150, width: 150},
                            likes = 0,
                            title = "unknown" }) => {
  const [likeContainerSize, setLikeContainerSize] = useState(25);
  const [likesCountText, setLikesCountText] = useState(likes + "");

  const styles = StyleSheet.create({
    container: style,
    image: {
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 20
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
        width: "100%",
        borderRadius: style['borderRadius']
    },
    likesBackground: {
        position: 'relative',
        alignItems: 'flex-start',
        backgroundColor: "#1DAF6E", 
        height: 15,
        width: likeContainerSize,
        top: -140,
        left: 10,
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
        top: -52,
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
    likesText: {
        position: 'relative',
        fontWeight: 'bold',
        fontSize: 10,
        left: 10,
        top: -13,
        marginLeft: 5
    },
    likesIcon: {
        position: 'relative',
        marginLeft: 1,
        marginTop: 1
    },
    titleContainer: {
        position: 'relative',
        top: -50,
        left: 10
    },
    titleText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    }
  });

    const calculateLikescontainerSize = () => {
        if (likes < 10) setLikeContainerSize(25);
        if (likes >= 10) setLikeContainerSize(30);
        if (likes >= 100) setLikeContainerSize(35);
        if (likes > 999) setLikesCountText("999+");
        else setLikesCountText("" + likes);
    };

    useEffect(calculateLikescontainerSize, []);

  return (
    <View style={styles.container}>
        <Image source={image} style={styles.image}/>
        <View style={styles.overlayContainer}>
            <Image source={require("../images/gradient2.png")} style={styles.gradient} />
            <View style={styles.likesBackground}>
                <MaterialCommunityIcons
                    name={"heart"}
                    size={12}
                    color={"black"}
                    style={styles.likesIcon}
                />
                <Text style={styles.likesText}>{likesCountText}</Text>
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
}

export default PlaceCard;
