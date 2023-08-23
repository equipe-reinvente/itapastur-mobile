import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from "@react-native-material/core";

const CircularImageCard = ({title = "",  
                        callback = () => {}, 
                        color='black', 
                        image=require("../images/imagePlaceholder.png"),
                        style = {width: 60, height: 85, marginRight: 25}},
                        id = 0) => {

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
            height: style['height'],
            width: style['width'],
        },
        buttonContainer: {
            position: 'relative',
            height: style['height'],
            width: 800
        },
        buttonPressableContainer: {
            height: style['height'],
            width: style['width']
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
            <Image source={image} style={styles.image}/>
            {title !== "" && <Text style={styles.title}>{title}</Text>}
            <View style={styles.overlayContainer}>
                <Button style={styles.button} color='rgba(0, 0, 0, 0)' uppercase={false}
                    contentContainerStyle={styles.buttonContainer} disableElevation
                    onPress={() => callback(id)} />
            </View>
        </View>
    );
};

export default CircularImageCard;