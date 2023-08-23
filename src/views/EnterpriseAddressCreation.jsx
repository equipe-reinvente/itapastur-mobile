import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "@react-native-material/core";
import { useEnterprise } from "../contexts/EnterpriseContext";

const EnterpriseAddressCreation = ({ navigation }) => {
  const { enterpriseData, setEnterpriseData } = useEnterprise();

  const onChangeStreetAddressInput = (streetAddress) => {
    setEnterpriseData((prevState) => ({
      ...prevState,
      streetAddress,
    }));
  };

  const onChangeAddressNumberInput = (addressNumber) => {
    setEnterpriseData((prevState) => ({
      ...prevState,
      addressNumber,
    }));
  };

  const onChangeNeighborhoodAddressInput = (neighborhoodAddress) => {
    setEnterpriseData((prevState) => ({
      ...prevState,
      neighborhoodAddress,
    }));
  };

  const handleNextStepButton = () => navigation.navigate('EnterpriseImageCreation');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Qual a localização?</Text>
          <Text style={styles.description}>
            Mostre onde fica o seu empreendimento! :D
          </Text>
        </View>

        <TextInput
          label="Rua"
          variant="outlined"
          autoCapitalize='none'
          onChangeText={onChangeStreetAddressInput}
          color='gray'
          value={enterpriseData.streetAddress}
          placeholder="2 de Fevereiro"
          style={styles.input}
        />

        <TextInput
          label="Número"
          variant="outlined"
          autoCapitalize='none'
          onChangeText={onChangeAddressNumberInput}
          color='gray'
          value={enterpriseData.addressNumber}
          placeholder="10"
          keyboardType="numeric"
          style={styles.input}
        />

        <TextInput
          label="Bairro"
          variant="outlined"
          autoCapitalize='none'
          onChangeText={onChangeNeighborhoodAddressInput}
          color='gray'
          value={enterpriseData.neighborhoodAddress}
          placeholder="Centro"
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={"PRÓXIMA ETAPA"}
          titleStyle={styles.buttonText}
          color="#1daf6e"
          contentContainerStyle={{height: 50}}
          onPress={handleNextStepButton}
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
    color: "#999999"
  },
  input: {
    width: 350,
    borderColor: 'gray',
    color: 'gray',
    tintColor: 'gray',
    marginBottom: 10
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

export default EnterpriseAddressCreation;
