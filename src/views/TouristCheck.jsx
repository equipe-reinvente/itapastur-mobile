import { View, Image, StyleSheet } from "react-native";
import { Button, Text } from "@react-native-material/core";
import { LinearGradient } from "expo-linear-gradient";

const TouristCheck = () => {
  return (
    <LinearGradient
      colors={["#1dad6d", "#232c26"]}
      style={styles.container}
    >
      <Image
        source={require('../assets/tourist.png')}
        style={styles.image}
      />

      <Text style={styles.title}>Você é um turista?</Text>

      <View style={styles.buttonContainer}>
        <Button
          title={"Sim"}
          style={styles.button}
          titleStyle={styles.buttonText}
          color="#1daf6e"
          contentContainerStyle={{height: 50}}
          onPress={() => {}}
        />

        <Button
          title={"Não"}
          style={styles.button}
          titleStyle={styles.buttonText}
          color="#e36352"
          contentContainerStyle={{height: 50}}
          onPress={() => {}}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#FFFFFF"
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    width: 100,
    marginHorizontal: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TouristCheck;
