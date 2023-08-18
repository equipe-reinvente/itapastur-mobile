import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, IconButton, Button, Divider } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");


  const [showPassword, setShowPassword] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordConfirmationErrorMessage, setPasswordConfirmationErrorMessage] = useState("");

  const makeLoginRequest = () => {
    setPasswordErrorMessage("");
    setEmailErrorMessage("");
    setPasswordConfirmationErrorMessage("");
    let canRegister = true;
    if (password.length < 7) {
      setPasswordErrorMessage("Senha inválida");
      setPassword("");
      canRegister = false;
    } if (email.length < 7 || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailErrorMessage("Email inválido");
      setEmail("");
      canRegister = false;
    } if (password != passwordConfirmation) {
      setPasswordConfirmationErrorMessage("As senhas não coincidem");
      setPassword("");
      setPasswordConfirmation("");
      canRegister = false;
    }
    if (!canRegister) return;

    let data = { 
      "email": email,
      "password": password
    }

    try {
      axios.post("https://itapastur-api.fly.dev/users", data)
      .then((response) => {
          if (response.status === 200) {
              navigation.navigate('Tabs');
          } else {
              let error = response.data["error"];
              setEmailErrorMessage(error);
          }
      }).catch(error => {
        Toast.show({
            type: 'error',
            position: 'top',
            text1: error.message,
            visibilityTime: 2000,
        });
      });
    } catch (error) {
        Toast.show({
            type: 'error',
            position: 'bottom',
            text1: error,
            visibilityTime: 2000,
        });
        navigation.navigate('Tabs');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const registerWithGoogle = () => {
  };

  const loginScreenLink = () => navigation.navigate('Login');

  const forgotPasswordScreenLink = () => {
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>
      <Text style={styles.subtitle}>Um passo para conhecer
        mais de Itapajé! :D</Text>

      <Text style={{ color: "red" }}>{emailErrorMessage}</Text>

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

      <Text style={{ color: "red" }}>{passwordErrorMessage}</Text>
      <TextInput
        label="Senha"
        variant="outlined"
        value={password}
        color='gray'
        autoCapitalize='none'
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

      <Text style={{ color: "red" }}>{passwordConfirmationErrorMessage}</Text>
      <TextInput
        label="Confirme sua senha"
        variant="outlined"
        autoCapitalize='none'
        value={passwordConfirmation}
        color='gray'
        placeholder="password123example"
        onChangeText={setPasswordConfirmation}
        style={styles.password}
      />


      <View style={styles.buttonContainerRegister}>
        <Button titleStyle={styles.buttonText} title="Cadastrar" color='#1DAF6E' contentContainerStyle={{ height: 48 }} onPress={makeLoginRequest} />
      </View>

      <View style={styles.dividerContainer}>
        <Divider style={styles.divider} color='gray'></Divider>
        <Text style={styles.dividerText}>ou cadastre-se com</Text>
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
          )} trailingContainerStyle={styles.googleButtonLogo} onPress={registerWithGoogle} />
        <Button titleStyle={styles.signupButtonText} title="já possui uma conta? faça login" contentContainerStyle={{ height: 48 }} style={styles.signupButton} variant="outlined" color='#1DAF6E' onPress={loginScreenLink} />
      </View>
      <Toast />
    </View >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: "36%",
    marginBottom: 10,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'left',
  },
  input: {
    borderColor: 'gray',
    color: 'gray',
    tintColor: 'gray',
    marginTop: 5,
    marginBottom: 5,
  },
  password: {
    borderColor: 'gray',
    color: 'gray',
    tintColor: 'gray',
    marginTop: 5,
  },
  buttonContainerRegister: {
    height: 48,
    width: 350,
    marginTop: 30,
    justifyContent: 'center'
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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

export default Register;