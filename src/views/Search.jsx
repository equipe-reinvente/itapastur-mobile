import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { TextInput, IconButton } from "@react-native-material/core";
import { useState } from 'react';
import { GetContext } from '../components/AppContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ImageCard from '../components/ImageCard';
import axios from "axios";
import CircularImageCard from '../components/CircularImageCard';

const Search = ({ navigation }) => {

    const [searchText, setSearchText] = useState("");
    const [searchCategory, setSearchCategory] = useState("Todas as Categorias");
    const [showCategories, setShowCategories] = useState(true);
    const { placesData, setPlacesData, authToken } = GetContext();
    const [results, setResults] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const { apiUrl } = GetContext();

    const searchByName = (text) => {
        setSearchText(text);
        if (results.length > 0) setResults([]);
        if (text !== "" && text !== null) setShowCategories(false);
        else setShowCategories(true);
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
          console.log(response.data);
          let data = response.data["enterprises"];
          if (data !== placesData) setPlacesData(data);
        } catch (error) {
          console.error('Erro ao buscar categorias:', error);
        }
    };

    const openPressedcard = (id, category) => {
        if (category == "Pontos Turísticos" || category == "Ponto Turístico") category = "pontos";
        else if (category == "Artesões" || category == "Artesão") category = "artesoes";
        else if (category == "Lojas" || category == "Loja") category = "lojas";
        console.log(category);
        const placeData = placesData[category].filter(item => item['id'] === id)[0];
        if (placeData === undefined) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Parece que esta item não carregou :(',
                visibilityTime: 2000,
              });
        } else {
            setCurrentPlaceData(placeData);
            navigation.navigate("Place");
        };
    };

    const refreshControl = async () => {
        setRefreshing(true);
        await pressedSearchKey();
        setRefreshing(false);
    }

    const pressedSearchKey = async () => {
        setLoading(true);
        await fetchCategories();
        let category = null;
        if (searchCategory === "Pontos turísticos") {
            category = 'pontos';
        } else if (searchCategory === "Lojas") {
            category = 'lojas';
        } else if (searchCategory === "Artesões") {
            category = 'artesoes';
        }
        setResults(searchItems(category));
    };

    const searchItems = (category) => {
        if (category !== null) {
            setLoading(false);
            return placesData[category].filter(item => item['name'].toLowerCase().includes(searchText.toLowerCase()));
        }
        else {
            let searchResults = [];
            searchResults = searchResults.concat(placesData['artesoes'].filter(item => item['name'].toLowerCase().includes(searchText.toLowerCase())));
            searchResults = searchResults.concat(placesData['lojas'].filter(item => item['name'].toLowerCase().includes(searchText.toLowerCase())));
            searchResults = searchResults.concat(placesData['pontos'].filter(item => item['name'].toLowerCase().includes(searchText.toLowerCase())));
            setLoading(false);
            return searchResults.sort((a, b) => b['favorites'] - a['favorites']);
        }
    };

    const changeCategory = (category) => {
        if (category === searchCategory) setSearchCategory("Todas as Categorias");
        else setSearchCategory(category);
    };

    const formateFavorites = (favorites) => {
        const favoritesCount = favorites;
        favorites = favorites.toString();

        if (favoritesCount > 1000 && favoritesCount < 1000000) {
            favorites = favorites.substring(0, favorites.length - 4) + "K";
        } else if (favoritesCount > 1000000 && favoritesCount < 1000000000) {
            favorites = favorites.substring(0, favorites.length - 7) + "M";
        } else if (favoritesCount >= 1000000000) {
            favorites = favorites.substring(0, favorites.length - 10) + "B";
        }

        return favorites;
    };

    const renderResults = (item) => {
        let name = item['name'];
        if (name.length > 30) {
            name = name.substring(0, 31) + "...";
        }

        let favorites = formateFavorites(item['favorites']);

        return (
            <View style={styles.storeImageCard} key={item['id']}>
                <CircularImageCard image={{uri: item['image_one']}} buttonStyle={{position: 'relative',
                                                                                height: '100%',
                                                                                width: 330}}
                                                                                callback={openPressedcard}
                                                                                category={item['category']}
                                                                                id={item['id']}/>
                <View style={{position: "relative", left: -10, zIndex: -1}}>
                    <Text style={{position: "relative", marginTop: 5}}>{name}</Text>
                    <View style={{flexDirection: "row", alignItems: 'flex-start'}}>
                        <MaterialCommunityIcons
                            name={"heart"}
                            size={10}
                            color="rgba(255, 0, 0, 0.5)"
                            style={{position: 'relative', top: 1}}
                        />
                        <Text style={{color: "rgba(255, 0, 0, 0.5)", fontSize: 10, fontWeight: 'bold'}}>{favorites}</Text>
                        <Text style={{fontSize: 11, color: 'rgba(0, 0, 0, 0.5)'}}> · {item['category']}</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: 'flex-start'}}>
                        <MaterialCommunityIcons
                            name={"compass"}
                            size={10}
                            color="rgba(0, 0, 0, 0.5)"
                            style={{position: 'relative', top: 1}}
                        />
                        <Text style={{fontSize: 9, color: "rgba(0, 0, 0, 0.5)"}}> {item['address']['street']} {item['address']['number']}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <TextInput
                variant="outlined"
                onChangeText={searchByName}
                color='gray'
                placeholder= {
                    "Buscar em " + searchCategory
                }
                style={styles.searchBar}
                inputContainerStyle={{backgroundColor: 'rgba(231, 231, 231, 255)', borderRadius: 30}}
                inputStyle={{borderRadius: 30}}
                onSubmitEditing={pressedSearchKey}
                leading={props => (
                    <IconButton icon={() => (
                        <MaterialCommunityIcons
                            name={"magnify"}
                            size={30}
                            color="#1DAF6E"
                        />
                        )}
                        onPress={searchByName}
                    />
                )}
            /> 

            {showCategories === true && 
            <View style={styles.categoriesContainer}>
                <Text style={styles.title}>
                    Categorias
                </Text>
                
                <View style={styles.cardContainer}>
                    <ImageCard image={require('../images/igrejaMatriz.png')} text='Pontos turísticos' id={0} callback={() => changeCategory('Pontos turísticos')}/>
                    <ImageCard image={require('../images/itapajePlaca.png')} text='Lojas' id={1} callback={() => changeCategory('Lojas')}/>
                    <ImageCard image={require('../images/artesanato.png')} text='Artesões' id={2} callback={() => changeCategory('Artesões')}/>
                </View>
            </View>}
            {!showCategories && 
            <View style={styles.scrollViewContainer}>
                {!loading && !refreshing && <ScrollView overScrollMode='never' style={{width: '100%', position: 'relative'}} refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshControl} />
                }>
                    {results.map(renderResults)}
                </ScrollView>}
                {loading && 
                <View style={{width: '100%', alignItems: 'center', marginTop: '80%'}}>
                    <ActivityIndicator size="large" color="#1DAF6E"/>
                </View>
                
                }
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignSelf: 'stretch',
        height: "100%",
        alignItems: 'center',
    },
    searchBar: {
        position: 'absolute',
        top: 0,
        marginTop: 30,
        backgroundColor: "#E7E7E7",
        width: 342,
        height: 39,
        borderRadius: 30,
    },
    cardContainer: {
        position: 'absolute',
        top: 150,
        bottom: -500,
        backgroundImage: '../images/Beatles.png'
    },
    categoryCard: {
        position: 'relative',
        width: 340,
        height: 165,
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
        color: "white",
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
    },
    title: {
        position: 'absolute',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        top: 105, 
        left: 0, 
        marginLeft: 25,
        color: 'black'
    },
    categoriesContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    storeImageCard: {
        position: "relative",
        alignItems: 'flex-start',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 70,
        marginBottom: 10
    },
    circularImageCardTextContainer: {
        position: "relative",
        alignItems: 'flex-start',
        width: 'stretch',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 70,
        marginBottom: 10
    },
    scrollViewContainer: {
        position: 'absolute',
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'flex-start',
        paddingBottom: 150,
        padding: 20,
        top: 80
    }
});

export default Search;
