import { Button } from "@react-native-material/core";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Image, StyleSheet, Text, ImageBackground } from "react-native";

const PlaceCard = ({ image=require("../images/imagePlaceholder.png"), 
                            style={position: "relative", borderRadius: 15, height: 150, width: 150, overflow: 'hidden',},
                            likes = 0,
                            title = "Unknown",
                            id = 0,
                            callback = () => {} }) => {
  const [likeContainerSize, setLikeContainerSize] = useState(25);
  const [likesCountText, setLikesCountText] = useState(likes + "");

  const styles = StyleSheet.create({
    container: style,
    image: {
        width: style['width'],
        height: style['height'],
        borderRadius: style['borderRadius'],
    },
    overlayContainer: {
        position: 'absolute', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: style['width'],
        height: style['height'],
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
        borderRadius: 20,
    },  
    button: {
        position: 'relative',
        width: "100%",
        height: "100%",
        top: -150,
        borderRadius: style['borderRadius'],
    },
    buttonContentContainer: {
        position: 'relative',
        height: '100%',
        borderRadius: style['borderRadius'],
    },
    buttonPressable: {
        position: 'relative',
        height: '100%',
        width: '100%',
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
            <Image source={require("../images/gradient2.png")} style={styles.gradient}/>
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
        </View>
        <View style={style.overlayContainer}>
            <Button style={styles.button} 
                contentContainerStyle={styles.buttonContentContainer} 
                color='rgba(0, 0, 0, 0)'
                disableElevation 
                onPress={() => callback(id)}/>
        </View>
    </View>
  );
}

export default PlaceCard;
