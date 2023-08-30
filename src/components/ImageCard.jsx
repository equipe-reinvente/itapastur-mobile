import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Button } from "@react-native-material/core";

const ImageCard = ({ text = "", image = require("../images/image_placeholder.png"), width = 340, height = 165, textColor = "white", callback = () => {}, id=0}) => {

    try {
        if (image.uri === null) image = require("../images/image_placeholder.png");
    } catch {}

    const styles = StyleSheet.create({
        cardContainer: {
            position: 'absolute',
            top: 150,
            bottom: -500,
        },
        categoryCard: {
            position: 'relative',
            width: width,
            height: height,
            overflow: 'hidden',
            borderRadius: 20,
            top: 0,
            marginBottom: 20
        },
        cardButton: {
            position: 'relative',
            width: "150%",
            height: "120%",
            left: -10,
            top: -18
        },
        cardImage: {
            width: "100%",
            height: "100%",
        },
        cardText: {
            position: 'relative',
            flex: 1,
            top: "-11%",
            left: "-2%",
            color: textColor,
            fontSize: 24,
            fontWeight: 'bold',
            zIndex: 2,
            marginLeft: 20,
            marginTop: 20
        },
        overlayContainer: {
            position: 'absolute', 
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0)',
        }
    });

    return (
        <View style={styles.categoryCard}>
            <ImageBackground source={image} style={styles.cardImage}/>
            <View style={styles.overlayContainer}>
                <Image source={require("../images/gradient.png")}/>
            </View>
            <View style={styles.overlayContainer}>
                <Button titleStyle={styles.cardText} 
                title= {text} style={styles.cardButton} 
                color='rgba(0, 0, 0, 0)' 
                contentContainerStyle={{height: "100%"}} 
                uppercase={false}
                onPress={() => callback(id)}/>
            </View>
        </View>
    )
};

export default ImageCard;