import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { useEvent } from "../contexts/EventContext";
import axios from "axios";
import { GetContext } from "../components/AppContext";
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import BackNavigationButton from "../components/BackNavigationButton";
import CreationTitle from "../components/CreationTitle";
import CreationInput from "../components/CreationInput";
import CreationMainButton from "../components/CreationMainButton";

const EventAddressCreation = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const { eventData, setEventData } = useEvent();
  const { enterpriseData } = route.params;
  const { authToken } = GetContext();
  const { apiUrl } = GetContext();

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

  const buildEventFormData = () => {
    const data = new FormData();

    let imageFormat = eventData.image.split(".")[eventData.image.split(".").length - 1];
    
    data.append('enterprise_id', enterpriseData['id']);
    data.append('name', eventData.name);
    data.append('description', eventData.description);
    data.append('date', eventData.date);
    data.append('time', eventData.time);
    data.append('street', eventData.streetAddress);
    data.append('number', eventData.addressNumber);
    data.append('neighborhood', eventData.neighborhoodAddress);
    data.append('latitude', -35.002);
    data.append('longitude', -32.100);
    data.append('image', {
      uri: eventData.image,
      name: `image.${imageFormat}`,
      type: `image/${imageFormat}`,
    });

    return data;
  };


  const handleFinishButton = async () => {
    const data = buildEventFormData();
    const eventsURL = apiUrl+'/events/';

    setLoading(true);

    try {
      const response = await axios.post(
        eventsURL,
        data,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 200) {
        setLoading(false);
        navigation.navigate('Perfil');
      } else {
        setLoading(false);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: error.message,
        visibilityTime: 2000,
      });
      setLoading(false);
    }
  };

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
        onPress={handleFinishButton}
      />
      <Toast />
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
