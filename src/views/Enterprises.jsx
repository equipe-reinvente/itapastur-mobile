import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { IconButton, Button } from "@react-native-material/core";
import { useState } from 'react';
import { useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GetContext } from '../components/AppContext';
import axios from 'axios'; 
import ThumbnailButton from '../components/ThumbnailButton';
import { useNavigation } from '@react-navigation/native';

const Enterprises = ({ navigation }) => {

    const [enterpriseList, setEnterpriseList] = useState([]);
    const { user, authToken } = GetContext(); 
    const [refreshing, setRefreshing] = useState(false);

    const openSelectedEnterprise = (key) => {
        let enterpriseData = enterpriseList.filter(item => item['id'] === key)[0];
        navigation.navigate("EnterprisesConfiguration", {enterpriseData});
    };

    const navigationEnteprise = useNavigation();

    const createEnterprise = () => {
        navigationEnteprise.navigate('EnterpriseInfoCreation');
    };

    const previousPage = () => {
        navigation.goBack();
    };

    const renderEnterprises = (item, key) => {
        if (item['name'].length > 25) {
            item['name'] = item['name'].substring(0, 26) + "...";
        }
        if (item['description'].length > 30) {
            item['description'] = item['description'].substring(0, 31) + "...";
        }
        return (
            <ThumbnailButton title={item['name']} subtitle={item['description']} key={item['id']} icon='chevron-right' callback={openSelectedEnterprise} iconColor='#1DAF6E' id={item['id']} image={{uri: item['image_one']}}/>
        );
    };

    const refreshControl = async () => {
        setRefreshing(true);
        await getEnterpriseList();
        setRefreshing(false);
    }

    const getEnterpriseList = async () => {
        try {
            const response = await axios.get(
                'https://itapastur-api.fly.dev/enterprises/' + user['user']['id'], 
                {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                }
            );
            const data = response.data['user_enterprises'];
            setEnterpriseList(data);
            console.log(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Erro do Axios:', error.message);
              } else {
                console.error('Erro:', error.message);
              }
        }
    }

    useEffect( () => {getEnterpriseList()}, []); 

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
                <ScrollView style={styles.scrollView} overScrollMode='never' refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshControl} />
                }>
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