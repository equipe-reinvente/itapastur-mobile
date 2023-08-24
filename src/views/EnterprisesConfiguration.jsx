import { View, Text, StyleSheet, Image } from 'react-native';
import { IconButton } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GetContext } from '../components/AppContext';
import ConfigButton from '../components/ConfigButton';
import { useEffect, useState } from 'react';

const EnterprisesConfiguration = ({ navigation, route }) => {
    const { enterpriseData } = route.params;

    const [enterpriseName, setEnterpriseName] = useState(enterpriseData['title']);
    const [currentEnterpriseData, setCurrentEnterpriseData] = useState({});

    
    //setCurrentEnterpriseData(enterpriseData);

    const openEnterprisesConfigurations = () => {
        
    };

    const openEnterprisesAddMembers = () => {
        
    };

    const openEnterprisesAddEvents = () => {
        
    };

    const resizeName = () => {
        if (enterpriseName.length > 14) {
            setEnterpriseName(enterpriseName.substring(0, 15) + "...");
        }
    };

    useEffect(resizeName, []);

    return (
        <View style={styles.container}>
            <View style={styles.userInfoContainer}>
                <View style={styles.backButtonBackground}>
                    <IconButton icon={() => (
                        <MaterialCommunityIcons
                            name="chevron-left"
                            size={30}
                            color="white"
                        />
                    )} style={styles.backButton}
                    onPress={() => navigation.goBack()}/>
                </View>
                {enterpriseData['image'] !== null && <Image style={styles.userPhoto} source={enterpriseData['image']}/>}
                {enterpriseData['image'] === null && <Image style={styles.userPhoto} source={require("../images/imagePlaceholder.png")}/>}
                <View style={styles.enterpriseNameCategoryContainer}>
                   <Text style={styles.enterpriseNameText}>{enterpriseName}</Text>
                    <Text style={styles.categoryTextStyle}>{enterpriseData['category']}</Text> 
                </View>
                <IconButton icon={() => (
                    <MaterialCommunityIcons
                        name="cog"
                        size={30}
                        color="black"
                    />
                )} style={styles.settingsButton}/>
            </View>
            <ConfigButton title='Configurações' subtilte='Gerencie seu empreendimento' icon='cog' callback={openEnterprisesConfigurations}/>
            <ConfigButton title='Adicionar membros' subtilte='Adicione funcionários, sócios e afins' icon='account-multiple' callback={openEnterprisesAddMembers}/>
            <ConfigButton title='Criar eventos' subtilte='Crie eventos no seu estabelecimento' icon='calendar-range' callback={openEnterprisesAddEvents}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    secondaryButtonsContainer: {
        position: 'relative',
        top: 200
    },
    backButton: {
        position: 'relative',
        height: '100%',
        width: '100%',
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
    },
    backButtonIcon: {

    },
    backButtonBackground: {
        position: 'relative',
        width: 38,
        height: '100%',
        backgroundColor: '#1DAF6E',
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
    },
    userInfoContainer: {
        position: "relative",
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        flexDirection: 'row',
        textAlign: 'left',
        verticalAlign: 'middle',
        backgroundColor: "#D9D9D9",
        height: 75,
        width: 352,
        marginTop: 20,
        borderRadius: 15
    },
    userPhoto: {
        position: 'relative',
        height: 50,
        width: 50,
        borderRadius: 25,
        marginTop: 12,
        marginLeft: 10
    },
    enterpriseNameText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: -3,
    },
    categoryTextStyle: {
        fontSize: 12,
    },
    enterpriseNameCategoryContainer: {
        position: 'relative',
        marginLeft: 10,
        top: 15
    },
    settingsButton: {
        position: 'absolute',
        margin: 295,
        top: -280
    }
});

export default EnterprisesConfiguration;