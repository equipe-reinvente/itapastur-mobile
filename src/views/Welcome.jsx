import { View, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Text } from "@react-native-material/core";

const WelcomeView = ({ navigation }) => {
  const description = "Explore Itapajé e todas as belezas naturais e cultura que esta cidade tem a oferecer!";

  const handleStartButton = () => navigation.navigate('Login');

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
      <Button
        title={"COMECE AGORA!"}
        style={styles.button}
        titleStyle={styles.buttonText}
        onPress={handleStartButton}
      />
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
  button: {
    width: 350,
    backgroundColor: "#1daf6e",
    borderRadius: 5,
    padding: 8,
    marginBottom: 90
  },
  buttonText: {
    fontSize: 16
  }
});

export default WelcomeView;
