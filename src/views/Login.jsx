import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, IconButton, Button, Divider } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const makeLoginRequest = () => {
        setPasswordErrorMessage("");
        setEmailErrorMessage("");
        let canLogin = true;
        if (password.length < 7) {
            setPasswordErrorMessage("Senha inválida");
            setPassword("");
            canLogin = false;
        } if (email.length < 7 || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailErrorMessage("Email inválido");
            setEmail("");
            canLogin = false;
        }
        if (!canLogin) return;

        let data = { 
            "email": email,
            "password": password
        }

        try {
            axios.post("http://127.0.0.1:3000/login", data).then((response) => {
                if (response.status === 200) {
                    navigation.navigate('Tabs');
                } else {
                    let error = response.data["error"];
                    setEmailErrorMessage(error);
                }
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: error.message,
                visibilityTime: 2000,
            });
            navigation.navigate('Tabs');
        }
  };

    const loginWithGoogle = () => {

    };

    const signupScreenLink = () => navigation.navigate('Register');


    const forgotPasswordScreenLink = () => {

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Bem-vindo novamente ao ItapasTur!</Text>

            <Text style={{color: "red", margin: 5}}>{emailErrorMessage}</Text>

            <TextInput
                label="Endereço de Email"
                variant="outlined"
                autoCapitalize='none'
                autoComplete='email'
                onChangeText={setEmail}
                color='gray'
                value={email}
                placeholder="example@gmail.com"
                style={styles.input}
            />
            
            <Text style={{color: "red", margin: 5}}>{passwordErrorMessage}</Text>

            <TextInput
                label="Senha"
                variant="outlined"
                autoCapitalize='none'
                value={password}
                color='gray'
                placeholder="password123example"
                onChangeText={setPassword}
                style={styles.password}
                secureTextEntry={!showPassword}
                trailing={props => (
                    <IconButton icon={() => (
                        <MaterialCommunityIcons
                        name={!showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="gray"
                        />
                        )}
                        onPress={togglePasswordVisibility}
                    />
                    )}
            />
            <Text style={styles.hyperlinkStyle} onPress={forgotPasswordScreenLink}>Esqueceu sua senha?</Text>
            <View style={{ height: 48, width: 350, marginTop: 30, justifyContent: 'center' }}>
                <Button titleStyle={styles.buttonText} title="Login" color='#1DAF6E' contentContainerStyle={{ height: 48 }} onPress={makeLoginRequest} />
            </View>

            <View style={styles.dividerContainer}>
                <Divider style={styles.divider} color='gray'></Divider>
                <Text style={styles.dividerText}>ou logue-se com</Text>
                <Divider style={styles.divider} color='gray'></Divider>
            </View>
            <View style={{ width: 350 }}>
                <Button titleStyle={styles.googleButtonText} title="CONTINUE COM GOOGLE" contentContainerStyle={{ height: 48 }} style={styles.googleButton} variant="outlined" color='black' trailing={
                    props => (
                        <MaterialCommunityIcons
                            name="google"
                            size={24}
                            color="black"
                        />
                    )} trailingContainerStyle={styles.googleButtonLogo} onPress={loginWithGoogle} />
                <Button titleStyle={styles.signupButtonText} title="CADASTRE-SE" contentContainerStyle={{ height: 48 }} style={styles.signupButton} variant="outlined" color='#1DAF6E' onPress={signupScreenLink} />
            </View>
            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: "50%",
        marginBottom: 10,
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'left',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        borderColor: 'gray',
        color: 'gray',
        tintColor: 'gray',
        marginBottom: 5
    },
    password: {
        borderColor: 'gray',
        color: 'gray',
        tintColor: 'gray'
    },
    hyperlinkStyle: {
        color: '#1DAF6E',
        marginTop: 5,
        textDecorationLine: 'underline'
    },
    loginButton: {
        marginTop: 20,
        backgroundColor: "#1DAF6E",
        height: 48,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    googleButtonText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        fontFamily: "Roboto",
        position: "relative",
        left: "60%"
    },
    googleButton: {
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 20
    },
    googleButtonLogo: {
        position: "relative",
        right: "-60%",
        paddingHorizontal: 10
    },
    signupButton: {
        borderColor: '#1DAF6E',
        borderWidth: 1
    },
    signupButtonText: {
        fontWeight: 'normal',
        color: '#1DAF6E',
        fontSize: 16,
        fontFamily: "Roboto",
    },
    buttonText: {
        fontWeight: 'normal',
        color: 'white',
        fontSize: 16,
        fontFamily: "Roboto",
    },
    divider: {
        marginTop: 35,
        flex: 1,
        height: 1,
    },
    dividerText: {
        position: "relative",
        top: 15,
        color: "grey",
        paddingHorizontal: 10,
    },
});

export default Login;