import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { TextInput, IconButton, Button, Divider } from "@react-native-material/core";
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Search = ({ navigation }) => {

    const [searchText, setSearchText] = useState("");
    const [searchCategory, setSearchCategory] = useState("Todas as Categorias")

    const searchByName = () => {

    }

    return (
        <View style={styles.container}>
            <TextInput
                variant="outlined"
                onChangeText={setSearchText}
                color='gray'
                placeholder= {
                    "Buscar em " + searchCategory
                }
                style={styles.searchBar}
                inputContainerStyle={{backgroundColor: 'rgba(231, 231, 231, 255)', borderRadius: 30}}
                inputStyle={{borderRadius: 30}}
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

            <Text style={styles.title}>
                Categorias
            </Text>
            
            <View style={styles.cardContainer}>
                <View style={styles.categoryCard}>
                    <ImageBackground source={require('../images/igrejaMatriz.png')} style={styles.cardImage}/>   
                    <View style={styles.overlayContainer}>
                        <Image source={require('../images/gradient.png')}/>
                    </View>
                    <View style={styles.overlayContainer}>
                        <Button titleStyle={styles.cardText} title="Pontos turísticos" style={styles.cardButton} color='rgba(0, 0, 0, 0)' contentContainerStyle={{height: "100%"}} uppercase={false}/>
                    </View>
                </View>
                <View style={styles.categoryCard}>
                    <ImageBackground source={require('../images/itapajePlaca.png')} style={styles.cardImage}/>
                    <View style={styles.overlayContainer}>
                        <Image source={require('../images/gradient.png')}/>
                    </View>
                    <View style={styles.overlayContainer}>
                        <Button titleStyle={styles.cardText} title="Lojas" style={styles.cardButton} color='rgba(0, 0, 0, 0)' contentContainerStyle={{height: "100%"}} uppercase={false}/>
                    </View>
                </View>
                <View style={styles.categoryCard}>
                    <ImageBackground source={require('../images/artesanato.png')} style={styles.cardImage}/>
                    <View style={styles.overlayContainer}>
                        <Image source={require('../images/gradient.png')}/>
                    </View>
                    <View style={styles.overlayContainer}>
                        <Button titleStyle={styles.cardText} title="Artesões" style={styles.cardButton} color='rgba(0, 0, 0, 0)' contentContainerStyle={{height: "100%"}} uppercase={false}/>
                    </View>
                </View>
            </View>
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
    }
});

export default Search;
