import { View, Text, StyleSheet } from 'react-native';
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
                inputContainerStyle={{backgroundColor: 'rgba(231, 231, 231, 255)', borderRadius: 10}}
                inputStyle={{borderRadius: 10}}
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
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        alignItems: 'center',
    },
    searchBar: {
        position: "absolute",
        top: 0,
        marginTop: 50,
        backgroundColor: "E7E7E7",
        width: 342,
        height: 39,
        borderRadius: 10,
    },
});

export default Search;
