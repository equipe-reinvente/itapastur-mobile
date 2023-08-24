import { View, Text, StyleSheet } from 'react-native';
import { Button, Divider } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SecondaryButton = ({title = "", 
                        height = 40, 
                        width = 352, 
                        callback = () => {}, 
                        icon = "", 
                        color='black', 
                        hasDivider = true, 
                        style = {width: width, height: height}}) => {

    const styles = StyleSheet.create({
        container: style,
        title: {
            fontWeight: 'bold',
            fontSize: 16,
            color: color
        },
        subtitle: {
            fontSize: 12,
            color: color
        },
        arrow: {
            position: 'relative',
            left: -95,
            color: color
        },
        divider: {
            position: 'relative',
            marginTop: 10
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
            marginTop: '2%'
        },
        leadingIcon: {
            position: 'relative',
            left: -350,
            color: color
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            {hasDivider && <Divider style={styles.divider}/>}
            <View style={styles.overlayContainer}>
                <Button style={styles.button} color='rgba(255, 255, 255, 0)' uppercase={false}
                    contentContainerStyle={styles.buttonContainer}
                    pressableContainerStyle={styles.buttonPressableContainer}
                    trailing={
                        props => (
                            <MaterialCommunityIcons
                                name="chevron-right"
                                size={24}
                                color={color}
                            />
                    )}
                    leading={
                        props => (
                            <MaterialCommunityIcons
                                name={icon}
                                size={24}
                                color={color}
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

export default SecondaryButton;