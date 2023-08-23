import { View, StyleSheet } from "react-native";
import { Text, Button } from "@react-native-material/core";
import { useEnterprise } from "../contexts/EnterpriseContext";

const EnterpriseImageCreation = ({ navigation }) => {
 return (
  <View style={styles.container}>
    <View style={styles.content}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Mostre seu empreendimento ao mundo!</Text>
        <Text style={styles.description}>Esse é o momento de caprichar!</Text>
      </View>
    </View>

    <View style={styles.buttonContainer}>
        <Button
          title={"FINALIZAR CADASTRO"}
          titleStyle={styles.buttonText}
          color="#1daf6e"
          contentContainerStyle={{height: 50}}
          onPress={() => {}}
          style={styles.button}
        />
      </View>
  </View>
 )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 120,
    marginBottom: 80
  },
  content: {
    marginBottom: 30
  },
  textContainer: {
    marginBottom: 15,
  },
  title: {
    fontSize: 42,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5
  },
  description: {
    fontSize: 20,
    textAlign: "center",
    color: "#5E5E5E"
  },
  buttonContainer: {
    marginTop: 50
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

export default EnterpriseImageCreation;
