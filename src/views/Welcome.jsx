import { View, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Text } from "@react-native-material/core";
import { GetContext } from '../components/AppContext';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const WelcomeView = ({ navigation }) => {
  const description = "Explore Itapajé e todas as belezas naturais e cultura que esta cidade tem a oferecer!";
  const { login } = GetContext();

  const handleStartButton = async () => {
    try {
      let userData = {'token': null};
      userData = await SecureStore.getItemAsync('userData');

      userData = JSON.parse(userData);

      login(userData);

      const response = await axios.get(
        'https://itapastur-api.fly.dev/categories/enterprises',
        {
          headers: {
            Authorization: `Bearer ${userData['token']}`,
          },
        }
      );
      console.log(userData);
      if (userData['token'] !== null && userData['token'] !== "") {
        navigation.navigate('Tabs');
      } else {
        navigation.navigate('Login');
      }
    } catch {
      navigation.navigate('Login');
    }
  }

  return (
    <LinearGradient
      colors={["#1dad6d", "#232c26"]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={"COMECE AGORA!"}
          style={styles.button}
          titleStyle={styles.buttonText}
          color="#1daf6e"
          contentContainerStyle={{height: 50}}
          onPress={handleStartButton}
        />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 240,
    height: 175,
    marginBottom: 25,
  },
  description: {
    width: 280,
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
  buttonContainer: {
    marginBottom: 90
  },
  button: {
    width: 350,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16
  }
});

export default WelcomeView;
