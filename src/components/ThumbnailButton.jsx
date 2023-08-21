import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, IconButton } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { GetContext } from '../components/AppContext';

const ThumbnailButton = ({style = {position: 'relative', height: 80, width: "100%", backgroundColor: '#D9D9D9', marginBottom: 5}, 
                        callback = () => {},
                        title = "",
                        subtitle = "",
                        image=require('../images/imagePlaceholder.png'),
                        icon = null,
                        iconColor = 'black',
                        isIconClickable=false,
                        iconCallback=() => {},
                        id = -1}, 
                        props) => {

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
        },
        iconButton: {
            position: 'relative',
            top: -65,
            left: 320,
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
                {!isIconClickable && 
                    <View>
                        {icon !== null && 
                            <Button style={styles.button} color='rgba(255, 255, 255, 0)' uppercase={false} 
                                contentContainerStyle={styles.buttonContainer} 
                                pressableContainerStyle={styles.buttonPressableContainer}
                                disableElevation
                                onPress={() => callback(id)}
                                trailing={
                                    props => (
                                        <MaterialCommunityIcons
                                            name={icon}
                                            size={40}
                                            color={iconColor}
                                        />
                                )}
                                trailingContainerStyle={styles.arrow}/>}
                        {icon === null && 
                            <Button style={styles.button} color='rgba(255, 255, 255, 0)' uppercase={false} 
                                contentContainerStyle={styles.buttonContainer} 
                                pressableContainerStyle={styles.buttonPressableContainer}
                                disableElevation
                                onPress={() => callback(id)}
                            />}
                    </View>}
                {isIconClickable && 
                    <View>
                        {icon !== null &&
                            <>
                                <Button style={styles.button} color='rgba(255, 255, 255, 0)' uppercase={false} 
                                    contentContainerStyle={styles.buttonContainer} 
                                    pressableContainerStyle={styles.buttonPressableContainer}
                                    disableElevation
                                    onPress={() => callback(id)}
                                    trailingContainerStyle={styles.arrow}/>
                                <IconButton icon={() => (
                                    <MaterialCommunityIcons
                                        name={icon}
                                        size={40}
                                        color={iconColor}
                                    />
                                )} style={styles.iconButton}
                                onPress={() => iconCallback(id)}/>
                            </>}
                        {icon === null && 
                            <Button style={styles.button} color='rgba(255, 255, 255, 0)' uppercase={false} 
                                contentContainerStyle={styles.buttonContainer} 
                                pressableContainerStyle={styles.buttonPressableContainer}
                                disableElevation
                                onPress={() => callback(id)}
                            />}
                    </View>}
            </View>
        </View>
    );
};

export default ThumbnailButton;