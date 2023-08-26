import { View, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { useState } from "react";
import { useEvent } from "../contexts/EventContext";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import BackNavigationButton from "../components/BackNavigationButton";
import CreationTitle from "../components/CreationTitle";
import CreationInput from "../components/CreationInput";
import SelectImage from "../components/SelectImage";
import CreationMainButton from "../components/CreationMainButton";
import { formatDate, removeNonDigitCharacters } from "../utils/formatDate";

const EventInfoCreation = ({ navigation }) => {
  const { eventData, setEventData } = useEvent();
  const [nameError, setNameError] = useState("");
  const [dateError, setDateError] = useState("");

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

  const isValidDate = (date) => {
    if (!date || date.length < 10) {
      return "Por favor, preencha o campo Data corretamente!";
    }

    const day = date.slice(0, 2);
    const month = date.slice(3, 5);
    const year = date.slice(6, 10);
    const currentYear = new Date().getFullYear();

    if (Number(day) <= 0 || Number(day) > 31) {
      return "Dia inválido. Verifique de que o dia esteja correto!";
    }
    if (Number(month) <= 0 || Number(month) > 12) {
      return "Mês inválido. Verifique se o mês está correto!";
    }
    if (Number(year) < currentYear) {
      return "Ano inválido. Verifique de que o ano esteja correto!";
    }
  };

  const onChangeDateInput = (date) => {
    if (date.length === 8) {
      setEventData((prevState) => ({
        ...prevState,
        date: formatDate(date),
      }));
    } else {
      setEventData((prevState) => ({
        ...prevState,
        date: removeNonDigitCharacters(date),
      }));
    }
  };

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
              onChangeText={() => {}}
              value={eventData.time}
              placeholder={"12:00"}
            />

            {/* <SelectImage /> */}

            <CreationMainButton
              buttonText={"PRÓXIMA ETAPA"}
              color={"#1daf6e"}
              onPress={handleNextStepButton}
            />
          </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 120,
    marginBottom: 80
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
