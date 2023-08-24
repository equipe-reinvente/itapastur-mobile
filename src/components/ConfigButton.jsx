import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Button, Divider } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ConfigButton = ({title = "", 
                    subtilte = "", 
                    height = 80, 
                    width = 352, 
                    callback = () => {}, 
                    icon = "", 
                    style = {width: width, height: height}}) => {

    const styles = StyleSheet.create({
        container: style,
        tilte: {
            fontWeight: 'bold',
            fontSize: 16,
        },
        subtitle: {
            fontSize: 12,
        },
        icon: {
    
        },
        arrow: {
            position: 'relative',
            left: -100,
        },
        divider: {
            position: 'relative',
            marginTop: 20
        },
        button: {
            position: 'relative',
            alignItems: 'flex-start',
            height: height,
            width: width,
        },
        buttonContainer: {
            position: 'relative',
            height: height,
            width: 800
        },
        buttonPressableContainer: {
            height: height,
            width: width
        },
        overlayContainer: {
            position: 'absolute', 
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        textContainer: {
            alignItems: 'flex-start',
            textAlign: 'left',
            position: 'relative',
            marginLeft: "20%",
            marginTop: '6%'
        },
        leadingIcon: {
            position: 'relative',
            left: -340
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.tilte}>{title}</Text>
                <Text style={styles.subtitle}>{subtilte}</Text>
            </View>
            <Divider style={styles.divider}/>
            <View style={styles.overlayContainer}>
                <Button style={styles.button} color='rgba(255, 255, 255, 0)' uppercase={false} 
                    contentContainerStyle={styles.buttonContainer} 
                    pressableContainerStyle={styles.buttonPressableContainer}
                    trailing={
                        props => (
                            <MaterialCommunityIcons
                                name="chevron-right"
                                size={40}
                                color="black"
                            />
                    )}
                    leading={
                        props => (
                            <MaterialCommunityIcons
                                name={icon}
                                size={40}
                                color="black"
                            />
                    )} 
                    trailingContainerStyle={styles.arrow}
                    leadingContainerStyle={styles.leadingIcon}
                    disableElevation
                    onPress={callback}/>
            </View>
        </View>
    );
};

export default ConfigButton;