import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { TextInput, IconButton, Button, Divider } from "@react-native-material/core";
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GetContext } from '../components/AppContext';
import ConfigButton from '../components/ConfigButton';
import SecondaryButton from '../components/SecondaryButton';

const Profile = ({ navigation }) => {
    const { profilePhoto, username, email } = GetContext();

    return (
        <View style={styles.container}>
            <View style={styles.userInfoContainer}>
                <Image style={styles.userPhoto} source={profilePhoto}/>
                <View style={styles.usernameEmailContainer}>
                   <Text style={styles.usernameText}>{username}</Text>
                    <Text style={styles.emailText}>{email}</Text> 
                </View>
                <IconButton icon={() => (
                    <MaterialCommunityIcons
                        name="cog"
                        size={30}
                        color="black"
                    />
                )} style={styles.settingsButton}>
                </IconButton>
            </View>
            <ConfigButton title='Empreendimentos' subtilte='Crie e gerencie seus negócios!' icon='briefcase'/>
            <ConfigButton title='Notificações' subtilte='Minha central de notificações' icon='bell-ring'/>
            <ConfigButton title='Favoritos' subtilte='Meus locais favoritos' icon='heart'/>
            <View style={styles.secondaryButtonsContainer}>
                    <SecondaryButton title='Ajuda' icon='help-circle' color='gray'/>
                    <SecondaryButton title='Configurações' icon='cog' color='gray'/>
                    <SecondaryButton title='Sugerir lugares' icon='store-plus' color='gray' hasDivider={false}/>
                    <SecondaryButton title='Sair' icon='logout' color='rgba(255, 0, 0, 0.4)' hasDivider={false}/>
            </View>
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
    userInfoContainer: {
        position: "relative",
        alignItems: 'flex-start',
        alignContent: 'flex-start',
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
    usernameText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: -3
    },
    emailText: {
        fontSize: 12,
    },
    usernameEmailContainer: {
        position: 'relative',
        left: 70,
        top: -45
    },
    settingsButton: {
        position: 'relative',
        left: 290,
        top: -95
    }
});

export default Profile;