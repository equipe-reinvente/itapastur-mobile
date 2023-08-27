import { View, StyleSheet } from "react-native";
import { useEvent } from "../contexts/EventContext";
import BackNavigationButton from "../components/BackNavigationButton";
import CreationTitle from "../components/CreationTitle";
import CreationInput from "../components/CreationInput";
import CreationMainButton from "../components/CreationMainButton";

const EventAddressCreation = ({ navigation }) => {
  const { eventData, setEventData } = useEvent();

  const onChangeStreetAddressInput = (streetAddress) => {
    setEventData((prevState) => ({
      ...prevState,
      streetAddress,
    }));
  };

  const onChangeAddressNumberInput = (addressNumber) => {
    setEventData((prevState) => ({
      ...prevState,
      addressNumber,
    }));
  };

  const onChangeNeighborhoodAddressInput = (neighborhoodAddress) => {
    setEventData((prevState) => ({
      ...prevState,
      neighborhoodAddress,
    }));
  };

  const handleBackButton = () => navigation.navigate('EventInfoCreation');

  const handleNextStepButton = () => navigation.navigate('Perfil');

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
          description={"Mostre onde fica o seu\nevento! :D"}
        />

        <CreationInput
          label={"Rua"}
          onChangeText={onChangeStreetAddressInput}
          value={eventData.streetAddress}
          placeholder={"2 de Fevereiro"}
        />

        <CreationInput
          label={"Número"}
          onChangeText={onChangeAddressNumberInput}
          value={eventData.addressNumber}
          placeholder={"10"}
          keyboardType={"numeric"}
        />

        <CreationInput
          label={"Bairro"}
          onChangeText={onChangeNeighborhoodAddressInput}
          value={eventData.neighborhoodAddress}
          placeholder={"Centro"}
        />
      </View>

      <CreationMainButton
        buttonText={"FINALIZAR CADASTRO"}
        color={"#1daf6e"}
        onPress={handleNextStepButton}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 80,
    marginBottom: 40
  },
  content: {
    marginTop: 5,
    marginBottom: 30
  }
});

export default EventAddressCreation;
