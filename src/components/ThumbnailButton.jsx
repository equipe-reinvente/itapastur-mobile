import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { GetContext } from '../components/AppContext';

const ThumbnailButton = ({style = {position: 'relative', height: 80, width: "100%", backgroundColor: '#D9D9D9', marginBottom: 5}, 
                        callback = () => {},
                        title = "",
                        subtitle = "",
                        image=require('../images/imagePlaceholder.png'),
                        icon = null}) => {

    const styles = StyleSheet.create({
        container: style,
        buttonContainer: {
            position: 'relative',
            height: style.height,
            width: 800
        },
        buttonPressableContainer: {
            height: style.height,
            width: style.width,
        },
        textContainer: {
            position: 'relative',
            left: 85,
            top: -30
        },
        title: {
            fontWeight: 'bold',
            fontSize: 15
        },
        subtitle: {
            fontSize: 13
        },
        imageThumb: {
            position: 'relative',
            top: 15,
            left: 20,
            width: 50,
            height: 50
        },
        overlayContainer: {
            position: 'absolute', 
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        arrow: {
            position: 'relative',
            left: -50,
        }
    });

    return (
        <View style={styles.container}>
            <Image source={image} style={styles.imageThumb}/>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text>{subtitle}</Text>
            </View>
            <View style={styles.overlayContainer}>
                {icon !== null && <Button style={styles.button} color='rgba(255, 255, 255, 0)' uppercase={false} 
                    contentContainerStyle={styles.buttonContainer} 
                    pressableContainerStyle={styles.buttonPressableContainer}
                    disableElevation
                    onPress={callback}
                    trailing={
                        props => (
                            <MaterialCommunityIcons
                                name={icon}
                                size={40}
                                color="#1DAF6E"
                            />
                    )}
                    trailingContainerStyle={styles.arrow}/>}
                {icon === null && <Button style={styles.button} color='rgba(255, 255, 255, 0)' uppercase={false} 
                    contentContainerStyle={styles.buttonContainer} 
                    pressableContainerStyle={styles.buttonPressableContainer}
                    disableElevation
                    onPress={callback}
                    />}
                
            </View>
        </View>
    );
};

export default ThumbnailButton;