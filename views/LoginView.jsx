import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, IconButton, Button, Divider } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginView = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Bem-vindo novamente ao ItapasTur!</Text>

      <TextInput
        label="Endereço de Email"
        variant="outlined"
        color='gray'
        style={styles.input}
    />
    
      <TextInput
        label="Senha"
        variant="outlined"
        color='gray'
        style={styles.password}
        secureTextEntry={showPassword}
        trailing={props => (
            <IconButton icon={() => (
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="gray"
                />
                )}
                onPress={togglePasswordVisibility}
            />
            )}
        />
        <Text style={styles.hyperlinkStyle}>Esqueceu sua senha?</Text>
        <Button titleStyle={styles.buttonText} title="Login" style={styles.loginButton}/>
        <View style={styles.dividerContainer}>
            <Divider style={styles.divider} color='gray'></Divider>
            <Text style={styles.dividerText}>ou logue-se com</Text>
            <Divider style={styles.divider} color='gray'></Divider>
        </View>  
        <View>
            <Button titleStyle={styles.googleButtonText} title="CONTINUE COM GOOGLE" style={styles.googleButton} variant="outlined" color='black' trailing={
                props => (
                    <MaterialCommunityIcons
                        name="google"
                        size={24}
                        color="black"
                    />
                )} trailingContainerStyle={styles.googleButtonLogo}/>
            <Button titleStyle={styles.singupButtonText} title="CADASTRE-SE" style={styles.singupButton} variant="outlined" color='#1DAF6E'/>
        </View>    
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
        marginBottom: 20
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
        borderRadius: 4,
        width: 326,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
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
        borderRadius: 4,
        width: 326,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        marginBottom: 20,
        borderWidth: 1
    },
    googleButtonLogo: {
        position: "relative",
        right: "-60%",
        paddingHorizontal: 10
    }, 
    singupButton: {
        borderRadius: 4,
        width: 326,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#1DAF6E',
        borderWidth: 1
    }, 
    singupButtonText: {
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

export default LoginView;