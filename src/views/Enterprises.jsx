import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { IconButton, Button } from "@react-native-material/core";
import { useState } from 'react';
import { useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GetContext } from '../components/AppContext';
import ThumbnailButton from '../components/ThumbnailButton';
import { useNavigation } from '@react-navigation/native';

const Enterprises = ({ navigation }) => {

    const [enterpriseList, setEnterpriseList] = useState([{'title': "Francy's Icecream Factory",
                                                        'subtitle': 'Gelateria a moda italiana',
                                                        'image': null,
                                                        'likes': '4k',
                                                        'category': 'Gelateria',
                                                        'address': "Rua Raimundo Felício, 120",
                                                        'members': ['Francisca Maria', 'Carlos Alberto'],
                                                        'id': 0}]);

    const openSelectedEnterprise = (key) => {
        let enterpriseData = enterpriseList[key];
        navigation.navigate("EnterprisesConfiguration", {enterpriseData});
    };

    const navigationEnteprise = useNavigation();

    const createEnterprise = () => {
        navigationEnteprise.navigate('EnterpriseInfoCreation');
    };

    const previousPage = () => {
        navigation.goBack();
    };

    const getEnterpriseList = () => {
        //const newItem = {'title': 'loja 1', 'subtitle': 'descrição loja 1', 'id': enterpriseList.length};
        //setEnterpriseList([...enterpriseList, newItem]);
    };

    const renderEnterprises = (item, key) => {
        return (
            <ThumbnailButton title={item['title']} subtitle={item['subtitle']} key={key} icon='chevron-right' callback={openSelectedEnterprise} iconColor='#1DAF6E' id={item['id']}/>
        );
    };

    useEffect(getEnterpriseList, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Seus Empreendimentos</Text>
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
                    {enterpriseList.map(renderEnterprises)}
                </ScrollView>
                <View style={styles.createButtonContainer}>
                    <Button titleStyle={styles.createButtonText} 
                        style={{width: 326}} 
                        title="cadastrar empreendimento" 
                        color='#1DAF6E' 
                        contentContainerStyle={styles.createButton} 
                        onPress={createEnterprise}/>
                </View>
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

export default Enterprises;