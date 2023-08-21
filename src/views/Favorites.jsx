import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { IconButton, Button } from "@react-native-material/core";
import { useState } from 'react';
import { useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GetContext } from '../components/AppContext';

import ThumbnailButton from '../components/ThumbnailButton';

const Favorites = ({ navigation }) => {

    const [favoritesList, setFavoritesList] = useState([]);

    const openSelectedFavorites = (key) => {

    };

    const deleteSelectedFavorites = (key) => {
        console.log(key);
        if (key !== null && key > -1) {
            const newList = favoritesList.filter(item => (item['id'] !== key));
            setFavoritesList(newList);
        }
    };

    const previousPage = () => {
        navigation.navigate("MainProfile");
    }

    const getfavoritesList = async () => {
        const newItem = {'title': 'loja 1', 'subtitle': 'descrição loja 1', 'id': favoritesList.length};
        setFavoritesList([...favoritesList, newItem]);
    };

    const renderFavorites = (item, key) => {
        return (
            <ThumbnailButton title={item['title']} 
            subtitle={item['subtitle']}
            key={key} 
            callback={openSelectedFavorites} 
            icon='heart-off' 
            isIconClickable={true} 
            iconCallback={deleteSelectedFavorites}
            id={item['id']}/>
        );
    };

    useEffect(getfavoritesList, []);

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
                <ScrollView style={styles.scrollView} overScrollMode='never'>
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