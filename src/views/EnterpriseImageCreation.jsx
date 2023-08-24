import { View, StyleSheet } from "react-native";
import { Text, Button } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEnterprise } from "../contexts/EnterpriseContext";

const EnterpriseImageCreation = ({ navigation }) => {
 return (
  <View style={styles.container}>
    <View style={styles.content}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Mostre seu empreendimento ao mundo!</Text>
        <Text style={styles.description}>Esse é o momento de caprichar!</Text>
      </View>

      <View style={styles.selectImageContainer}>
        <MaterialCommunityIcons
          name={ 'camera-plus' }
          size={50}
          color={"#B0B0B0"}
        />

        <View style={styles.plusCircleContainer}>
          <MaterialCommunityIcons
            name={ 'plus-circle' }
            size={40}
            color={"#000000"}
          />
        </View>
      </View>

      <View style={styles.selectImageContainer}>
        <MaterialCommunityIcons
          name={ 'camera-plus' }
          size={50}
          color={"#B0B0B0"}
        />

        <View style={styles.plusCircleContainer}>
          <MaterialCommunityIcons
            name={ 'plus-circle' }
            size={40}
            color={"#000000"}
          />
        </View>
      </View>

      <View style={styles.selectImageContainer}>
        <MaterialCommunityIcons
          name={ 'camera-plus' }
          size={50}
          color={"#B0B0B0"}
        />

        <View style={styles.plusCircleContainer}>
          <MaterialCommunityIcons
            name={ 'plus-circle' }
            size={40}
            color={"#000000"}
          />
        </View>
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
    marginTop: 75,
    marginBottom: 135
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
  selectImageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    height: 120,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#8C8C8C",
    marginBottom: 12
  },
  plusCircleContainer: {
    position: "absolute",
    bottom: -15,
    right: -18,
  },
  buttonContainer: {
    marginTop: 5
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
