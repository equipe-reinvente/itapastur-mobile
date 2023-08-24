import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from "@react-native-material/core";
import { useState } from 'react';

const CircularImageCard = ({title = "",  
                        callback = () => {}, 
                        color='black', 
                        image=require("../images/imagePlaceholder.png"),
                        style = {width: 60, height: 85, marginRight: 25},
                        buttonStyle = {position: 'relative',
                        alignItems: 'flex-start',
                        height: style['height'],
                        width: style['width'],},
                        id = 0,}) => {

    const imageBorderRadius = style['width'] / 2;

    const styles = StyleSheet.create({
        container: style,
        title: {
            fontWeight: 'bold',
            fontSize: 10,
            color: color,
            textAlign: 'center',
            marginTop: 2
        },
        button: {
            position: 'relative',
            alignItems: 'flex-start',
            height: buttonStyle['height'],
            width: buttonStyle['width'],
        },
        buttonContainer: buttonStyle,
        buttonPressableContainer: {
            height: buttonStyle['height'],
            width: buttonStyle['width']
        },
        overlayContainer: {
            position: 'absolute', 
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: style['width'],
            height: style['width'],
            backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        image: {
            height: style['width'],
            width: style['width'],
            borderRadius: imageBorderRadius,
            borderWidth: 2,
            borderColor: "#1DAF6E",
        }
    });

    return (
        <View style={styles.container}>
            {image!==null && <Image source={image} style={styles.image}/>}
            {image===null && <Image source={require("../images/imagePlaceholder.png")} style={styles.image}/>}
            {title !== "" && <Text style={styles.title}>{title}</Text>}
            <View style={styles.overlayContainer}>
                <Button style={styles.button} color='rgba(255, 255, 255, 0)' uppercase={false}
                    contentContainerStyle={styles.buttonContainer} disableElevation
                    onPress={() => callback(id)} />
            </View>
        </View>
    );
};

export default CircularImageCard;