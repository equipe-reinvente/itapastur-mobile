import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { IconButton } from "@react-native-material/core";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GetContext } from '../components/AppContext';
import ThumbnailButton from '../components/ThumbnailButton';

const Notifications = ({ navigation }) => {

    const [notificationList, setNotificationList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { authToken, user, setUser } = GetContext();
    const [loading, setLoading] = useState(true);
    const { apiUrl } = GetContext();

    const openSelectedNotification = (key) => {

    };

    const refreshControl = async () => {
        setRefreshing(true);
        await getNotificationList();
        setRefreshing(false);
    }

    const previousPage = () => {
        try {
            navigation.goBack();
        } catch (error) {console.log(error);}
    }

    const getNotificationList = async (data) => {
        
    };

    const renderNotifications = (item, key) => {
        return (
            <ThumbnailButton title={item['name']} subtitle={item['description']} key={key} callback={openSelectedNotification} id={item['id']}/>
        );
    };

    const fetchCategories = async () => {
        try {
          const response = await axios.get(
            apiUrl+'/categories/enterprises',
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          let data = response.data["enterprises"]; 
          getNotificationList(data);
        } catch (error) {
          console.error('Erro ao buscar categorias:', error);
        };
    };

    useEffect(() => {setLoading(false)}, []);

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
            {!loading && !refreshing &&
            <View style={styles.scrollViewContainer}>
                <ScrollView style={styles.scrollView} overScrollMode='never' refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshControl} />
                }>
                    {notificationList.map(renderNotifications)}
                </ScrollView>
            </View>}
            {loading && <ActivityIndicator size="large" color="#1DAF6E" style={{marginTop: '80%'}}/>}
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