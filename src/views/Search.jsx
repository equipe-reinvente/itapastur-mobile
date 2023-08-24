import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput, IconButton } from "@react-native-material/core";
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ImageCard from '../components/ImageCard';
import CircularImageCard from '../components/CircularImageCard';

const Search = ({ navigation }) => {

    const [searchText, setSearchText] = useState("");
    const [searchCategory, setSearchCategory] = useState("Todas as Categorias");
    const [showCategories, setShowCategories] = useState(true);
    const [items, setItems] = useState({'attractions': [{'title': 'Pedra do Frade', 
                                                        'image': require("../assets/PedraDoFrade.jpg"),
                                                        'likes': '10',
                                                        'category': 'Ponto turístico',
                                                        'address': "Rua pedra furada, 2"}],
                                        'stores': [{'title': 'Shopping Pães', 
                                                    'image': null,
                                                    'likes': '1',
                                                    'category': 'Restaurante',
                                                    'address': "Rua pão de mel, 10"},
                                                    {'title': "Francy's Icecream Factory",
                                                    'image': null,
                                                    'likes': '4k',
                                                    'category': 'Gelateria',
                                                    'address': "Rua Raimundo Felício, 120"}],
                                        'artisans': [{'title': "D'veras tecído", 
                                                    'image': null,
                                                    'likes': '50',
                                                    'category': 'Tecelagem',
                                                    'address': "Rua fulano de tal, 130"}]});
    const [results, setResults] = useState([]);

    const searchByName = (text) => {
        setSearchText(text);
        if (results.length > 0) setResults([]);
        if (text !== "" && text !== null) setShowCategories(false);
        else setShowCategories(true);
    };

    const pressedSearchKey = () => {
        let category = null;
        if (searchCategory === "Pontos turísticos") {
            category = 'attractions';
        } else if (searchCategory === "Lojas") {
            category = 'stores';
        } else if (searchCategory === "Artesões") {
            category = 'artisans';
        }
        setResults(searchItems(category));
    };

    const searchItems = (category) => {
        if (category !== null) return items[category].filter(item => item['title'].toLowerCase().includes(searchText.toLowerCase()));
        else {
            let searchResults = [];
            searchResults = searchResults.concat(items['artisans'].filter(item => item['title'].toLowerCase().includes(searchText.toLowerCase())));
            searchResults = searchResults.concat(items['attractions'].filter(item => item['title'].toLowerCase().includes(searchText.toLowerCase())));
            searchResults = searchResults.concat(items['stores'].filter(item => item['title'].toLowerCase().includes(searchText.toLowerCase())));
            return searchResults;
        }
    };

    const changeCategory = (category) => {
        if (category === searchCategory) setSearchCategory("Todas as Categorias");
        else setSearchCategory(category);
    };

    const renderResults = (item) => {
        return (
            <View style={styles.storeImageCard}>
                <CircularImageCard image={item['image']}/>
                <View style={{position: "relative", left: -10}}>
                    <Text style={{position: "relative", marginTop: 5}}>{item['title']}</Text>
                    <View style={{flexDirection: "row", alignItems: 'flex-start'}}>
                        <MaterialCommunityIcons
                            name={"heart"}
                            size={10}
                            color="rgba(255, 0, 0, 0.5)"
                            style={{position: 'relative', top: 1}}
                        />
                        <Text style={{color: "rgba(255, 0, 0, 0.5)", fontSize: 10, fontWeight: 'bold'}}>{item['likes']}</Text>
                        <Text style={{fontSize: 11, color: 'rgba(0, 0, 0, 0.5)'}}> · {item['category']}</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: 'flex-start'}}>
                        <MaterialCommunityIcons
                            name={"compass"}
                            size={10}
                            color="rgba(0, 0, 0, 0.5)"
                            style={{position: 'relative', top: 1}}
                        />
                        <Text style={{fontSize: 9, color: "rgba(0, 0, 0, 0.5)"}}> {item['address']}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const getSearchItems = () => {

    };

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
                <ScrollView overScrollMode='none'>
                    {results.map(renderResults)}
                </ScrollView>
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
        backgroundColor: "E7E7E7",
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
        width: 'stretch',
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
        width: '100%',
        alignItems: 'flex-start',
        paddingBottom: 100,
        padding: 20,
        top: 80
    }
});

export default Search;
