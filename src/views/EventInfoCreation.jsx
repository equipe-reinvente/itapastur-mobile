import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "@react-native-material/core";
import { useState } from "react";
import { useEvent } from "../contexts/EventContext";
import * as ImagePicker from 'expo-image-picker';
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import BackNavigationButton from "../components/BackNavigationButton";
import CreationTitle from "../components/CreationTitle";
import CreationInput from "../components/CreationInput";
import SelectImage from "../components/SelectImage";
import CreationMainButton from "../components/CreationMainButton";
import { formatDate, removeNonDigitCharactersDate } from "../utils/formatDate";
import { formatTime, removeNonDigitCharactersTime } from "../utils/formatTime";

const EventInfoCreation = ({ navigation }) => {
  const { eventData, setEventData } = useEvent();
  const [nameError, setNameError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");

  const onChangeNameInput = (name) => {
    setNameError("");
    setEventData((prevState) => ({
      ...prevState,
      name,
    }));
  };

  const isValidName = (name) => name.trim() !== "";

  const onChangeDescriptionInput = (description) => {
    setNameError("");
    setEventData((prevState) => ({
      ...prevState,
      description,
    }));
  };

  const onChangeDateInput = (date) => {
    setDateError("");
    if (date.length === 8) {
      setEventData((prevState) => ({
        ...prevState,
        date: formatDate(date),
      }));
    } else {
      setEventData((prevState) => ({
        ...prevState,
        date: removeNonDigitCharactersDate(date),
      }));
    }
  };

  const isValidDate = (date) => {
    if (!date || date.length < 10) {
      return "Por favor, preencha o campo Data corretamente!";
    }

    const day = date.slice(0, 2);
    const month = date.slice(3, 5);
    const year = date.slice(6, 10);
    const currentYear = new Date().getFullYear();

    if (Number(day) <= 0 || Number(day) > 31) {
      return "Dia inválido. Verifique se o dia está correto!";
    }
    if (Number(month) <= 0 || Number(month) > 12) {
      return "Mês inválido. Verifique se o mês está correto!";
    }
    if (Number(year) < currentYear) {
      return "Ano inválido. Verifique se o ano está correto!";
    }
  };

  const onChangeTimeInput = (time) => {
    const cleanedTime = removeNonDigitCharactersTime(time);

    if (time.length === 4) {
      setEventData((prevState) => ({
        ...prevState,
        time: formatTime(cleanedTime),
      }));
    } else {
      setEventData((prevState) => ({
        ...prevState,
        time: cleanedTime,
      }));
    }
  }

  const isValidTime = (time) => {
    if (!time || time.length < 5) {
      return "Por favor, preencha o campo Hora corretamente!";
    }

    const hours = time.slice(0, 2);
    const minutes = time.slice(3, 5);

    if (Number(hours) > 23 || Number(minutes) > 59) {
      return "Horário inválido. Verifique se o horário está correto!";
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageURI = result.assets[0].uri;

      setEventData((prevState) => ({
        ...prevState,
        image: imageURI,
      }));
    }
  }

  const handleBackButton = () => navigation.goBack();

  const handleNextStepButton = () => {
    if (!isValidName(eventData.name)) {
      setNameError("Por favor, preencha o campo Nome!");
      return;
    }
    if (isValidDate(eventData.date)) {
      setDateError(isValidDate(eventData.date));
      return;
    }
    if (isValidTime(eventData.time)) {
      setTimeError(isValidTime(eventData.time));
      return;
    }
    navigation.navigate('Welcome');
  };

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        <BackNavigationButton
          size={40}
          color={"#1DAF6E"}
          handleBackButton={handleBackButton}
        />
        <View style={styles.scrollViewContainer}>
          <ScrollView overScrollMode='never' style={{width: '100%'}}>
            <View style={styles.content}>
              <CreationTitle
                title={"Crie um Evento"}
                description={"Aumente suas vendas com eventos!"}
              />
              <CreationInput
                label={"Nome"}
                onChangeText={onChangeNameInput}
                value={eventData.name}
                placeholder={"Festa de Itapajé"}
              />
              {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
              <CreationInput
                label={"Descrição"}
                multiline
                numberOfLines={8}
                onChangeText={onChangeDescriptionInput}
                value={eventData.description}
                placeholder={"Venda seu peixe aqui! :)"}
              />
              <CreationInput
                label={"Data"}
                onChangeText={onChangeDateInput}
                value={eventData.date}
                placeholder={"07/09/2023"}
                keyboardType={"numeric"}
                maxLength={10}
              />
              {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}
              <CreationInput
              label={"Hora"}
              onChangeText={onChangeTimeInput}
              value={eventData.time}
              placeholder={"12:00"}
              keyboardType={"numeric"}
                maxLength={5}
              />
              {timeError ? <Text style={styles.errorText}>{timeError}</Text> : null}
              <SelectImage
                image={eventData.image}
                pickImage={pickImage}
                editImage={pickImage}
              />
              <CreationMainButton
                buttonText={"PRÓXIMA ETAPA"}
                color={"#1daf6e"}
                onPress={handleNextStepButton}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: '100%',
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 75,
    marginBottom: 0
  },
  scrollViewContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    top: 30,
    paddingBottom: 20,
  },
  content: {
    marginBottom: 30
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  }
});

export default EventInfoCreation;
