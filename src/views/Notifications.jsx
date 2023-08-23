import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { IconButton, Button } from "@react-native-material/core";
import { useState } from 'react';
import { useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GetContext } from '../components/AppContext';

import ThumbnailButton from '../components/ThumbnailButton';

const Notifications = ({ navigation }) => {

    const [notificationList, setNotificationList] = useState([]);

    const openSelectedNotification = (key) => {

    };

    const previousPage = () => {
        navigation.navigate("MainProfile");
    }

    const getNotificationList = () => {
        const newItem = {'title': 'notificação 1', 'subtitle': 'descrição notificação 1', 'id': notificationList.length};
        setNotificationList([...notificationList, newItem]);
    };

    const renderNotifications = (item, key) => {
        return (
            <ThumbnailButton title={item['title']} subtitle={item['subtitle']} key={key} callback={openSelectedNotification} id={item['id']}/>
        );
    };

    useEffect(getNotificationList, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Notificações</Text>
                <IconButton style={styles.backButton} icon={
                props => (
                    <MaterialCommunityIcons
                        name="chevron-left"
                        size={40}
                        color="#1DAF6E"
                    />
                )}
                onPress={previousPage}/>
            </View>
            <View style={styles.scrollViewContainer}>
                <ScrollView style={styles.scrollView} overScrollMode='never'>
                    {notificationList.map(renderNotifications)}
                </ScrollView>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        height: "100%",
        width: "100%",
        top: 0,
        left: 0
    },  
    title: {
        position: 'relative',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    headerContainer: {
        position: 'relative',
        marginTop: 30,
        left: 0,
        height: 50,
        alignItems: 'center',
        textAlign: 'center',
    },
    backButton: {
        position: 'relative',
        top: -67,
        left: -160,
        marginTop: 30
    },
    scrollView: {
        position: 'relative',
    },
    scrollViewContainer: {
        position: 'relative',
        flex: 1,
        height: 400,
        paddingBottom: 60
    },
    createButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    createButton: {
        position: 'relative',
        height: 48,
    },
    createButtonContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 45
    }
});

export default Notifications;