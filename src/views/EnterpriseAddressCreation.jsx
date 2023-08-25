import { View, StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";
import { useEnterprise } from "../contexts/EnterpriseContext";
import BackNavigationButton from "../components/BackNavigationButton";
import CreationTitle from "../components/CreationTitle";
import CreationInput from "../components/CreationInput";

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

  const handleBackButton = () => navigation.navigate('EnterpriseInfoCreation');

  const handleNextStepButton = () => navigation.navigate('EnterpriseImageCreation');

  return (
    <View style={styles.container}>
      <BackNavigationButton
        size={40}
        color={"#1DAF6E"}
        handleBackButton={handleBackButton}
      />

      <View style={styles.content}>
        <CreationTitle
          title={"Qual a\nlocalização?"}
          description={"Mostre onde fica o seu empreendimento! :D"}
        />

        <CreationInput
          label={"Rua"}
          onChangeText={onChangeStreetAddressInput}
          value={enterpriseData.streetAddress}
          placeholder={"2 de Fevereiro"}
        />

        <CreationInput
          label={"Número"}
          onChangeText={onChangeAddressNumberInput}
          value={enterpriseData.addressNumber}
          placeholder={"10"}
          keyboardType={"numeric"}
        />

        <CreationInput
          label={"Bairro"}
          onChangeText={onChangeNeighborhoodAddressInput}
          value={enterpriseData.neighborhoodAddress}
          placeholder={"Centro"}
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
    marginTop: 10,
    marginBottom: 30
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
