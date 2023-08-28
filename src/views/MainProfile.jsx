import { View, Text, StyleSheet, Image } from 'react-native';
import { IconButton } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GetContext } from '../components/AppContext';
import ConfigButton from '../components/ConfigButton';
import SecondaryButton from '../components/SecondaryButton';
import { useEffect, useState } from 'react';

const MainProfile = ({ navigation }) => {
    const { profilePhoto, user, logout } = GetContext();
    const [username, setUsername] = useState("");

    const openEnterprisesMenu = () => {
        navigation.navigate("Enterprises");
    };

    const openNotificationsMenu = () => {
        navigation.navigate("Notifications");
    };

    const openFavoritesMenu = () => {
        navigation.navigate("Favorites");
    };

    const handleLogout = () => {
        logout();
        navigation.navigate("Login");
    };

    const setUsernameText = () => {
        console.log(user);
        if (user['user']['name'] === null) {
            let usernmae_processed = user['user']['email'].split("@")[0];
            if (usernmae_processed.length > 16) setUsername(usernmae_processed.substring(0, 17) + "...");
            else setUsername(usernmae_processed);
        } else if (user['user']['name'].length > 16) {
            setUsername(user['user']['name'].substring(0, 17) + "...");
        } else setUsername(user['user']['name']);
    }

    useEffect(setUsernameText, []);

    return (
        <View style={styles.container}>
            <View style={styles.userInfoContainer}>
                {profilePhoto !== null && <Image style={styles.userPhoto} source={profilePhoto}/>}
                {profilePhoto === null && <Image style={styles.userPhoto} source={require("../images/profilePhoto.png")}/>}
                <View style={styles.usernameEmailContainer}>
                   <Text style={styles.usernameText}>{username}</Text>
                    <Text style={styles.emailText}>{user['user']['email']}</Text> 
                </View>
                <IconButton icon={() => (
                    <MaterialCommunityIcons
                        name="cog"
                        size={30}
                        color="black"
                    />
                )} style={styles.settingsButton}/>
            </View>
            <ConfigButton title='Empreendimentos' subtilte='Crie e gerencie seus negócios!' icon='briefcase' callback={openEnterprisesMenu}/>
            <ConfigButton title='Notificações' subtilte='Minha central de notificações' icon='bell-ring' callback={openNotificationsMenu}/>
            <ConfigButton title='Favoritos' subtilte='Meus locais favoritos' icon='heart' callback={openFavoritesMenu}/>
            <View style={styles.secondaryButtonsContainer}>
                    <SecondaryButton title='Ajuda' icon='help-circle' color='gray'/>
                    <SecondaryButton title='Configurações' icon='cog' color='gray'/>
                    <SecondaryButton title='Sugerir lugares' icon='store-plus' color='gray' hasDivider={false}/>
                    <SecondaryButton title='Sair' icon='logout' color='rgba(255, 0, 0, 0.4)' hasDivider={false} callback={handleLogout}/>
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
        marginLeft: 10,
        top: 15
    },
    settingsButton: {
        position: 'absolute',
        margin: 295,
        top: -280
    }
});

export default MainProfile;