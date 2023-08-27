import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { IconButton } from "@react-native-material/core";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GetContext } from '../components/AppContext';

import ThumbnailButton from '../components/ThumbnailButton';

const Favorites = ({ navigation }) => {

    const [favoritesList, setFavoritesList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { authToken, user, setUser } = GetContext();

    const openSelectedFavorites = (id, category) => {
        if (category == "Pontos Turísticos" || category == "Ponto Turístico") category = "pontos";
        else if (category == "Artesões" || category == "Artesão") category = "artesoes";
        else if (category == "Lojas" || category == "Loja") category = "lojas";
        console.log(category);
        const placeData = favoritesList[category].filter(item => item['id'] === id)[0];
        if (placeData === undefined) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Parece que esta item não carregou :(',
                visibilityTime: 2000,
              });
        } else navigation.navigate("Place", {placeData});
    };

    const deleteSelectedFavorites = (id) => {
        console.log(id);
        if (id !== null && id > -1) {
            const newList = favoritesList.filter(item => (item['id'] !== id));
            setFavoritesList(newList);
            unfavoriteOnBackend(id);
        }
    };

    const previousPage = () => {
        navigation.goBack();
    }

    const unfavoriteOnBackend = async (id) => {
        const response = await axios.post(
            'https://itapastur-api.fly.dev/like', {user_id: user['user']['id'], enterprise_id: id},
            {
              headers: {
                  Authorization: `Bearer ${authToken}`,
              },
            }
        );
    };

    const getfavoritesList = async (data, userData) => {
        let newList = data['lojas'].filter(item => userData['liked_enterprises'].includes(item['id']));
        newList.concat(data['pontos'].filter(item => userData['liked_enterprises'].includes(item['id'])));
        newList.concat(data['artesoes'].filter(item => userData['liked_enterprises'].includes(item['id'])));
        console.log(newList);
        setFavoritesList(newList);
    };

    const renderFavorites = (item) => {
        return (
            <ThumbnailButton title={item['name']} 
            subtitle={item['description']}
            key={item['id']} 
            callback={openSelectedFavorites} 
            icon='heart-off' 
            isIconClickable={true} 
            image={{uri: item['image_one']}}
            iconCallback={deleteSelectedFavorites}
            id={item['id']}
            cat/>
        );
    };

    const refreshControl = async () => {
        setRefreshing(true);
        await fetchUserInfo();
        setRefreshing(false);
    };

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(
                'https://itapastur-api.fly.dev/view_user/'+ user['user']['id'],
                {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                }
              );
              let userData = {
                enterprises: response['data']['enterprises'],
                token: user['token'],
                liked_enterprises: response['data']['liked_enterprises'],
                user: response['data']['user']
              };
              console.log(userData);
              setUser(userData);
              fetchCategories(userData);
        } catch (error) {console.log(error);}
    };

    const fetchCategories = async (userData) => {
        try {
          const response = await axios.get(
            'https://itapastur-api.fly.dev/categories/enterprises',
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          let data = response.data["enterprises"]; 
          getfavoritesList(data, userData);
        } catch (error) {
          console.error('Erro ao buscar categorias:', error);
        };
    };

    useEffect(() => {fetchUserInfo()}, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Favoritos</Text>
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
                <ScrollView style={styles.scrollView} overScrollMode='never' refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshControl} />
                }>
                    {favoritesList.map(renderFavorites)}
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

export default Favorites;