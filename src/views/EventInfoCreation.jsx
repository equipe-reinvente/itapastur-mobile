import { View, StyleSheet } from "react-native";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import BackNavigationButton from "../components/BackNavigationButton";
import CreationTitle from "../components/CreationTitle";
import CreationInput from "../components/CreationInput";
import SelectImage from "../components/SelectImage";
import CreationMainButton from "../components/CreationMainButton";

const EventInfoCreation = ({ navigation }) => {
  const handleBackButton = () => navigation.goBack();

  const handleNextStepButton = () => navigation.goBack();

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
              onChangeText={() => {}}
              value={""}
              placeholder={"Festa de Itapajé"}
            />

            <CreationInput
              label={"Descrição"}
              multiline
              numberOfLines={8}
              onChangeText={() => {}}
              value={""}
              placeholder={"Venda seu peixe aqui! :)"}
            />

            <CreationInput
              label={"Data"}
              onChangeText={() => {}}
              value={""}
              placeholder={"07/09/2023"}
            />

            <CreationInput
              label={"Hora"}
              onChangeText={() => {}}
              value={""}
              placeholder={"12:00"}
            />

            <SelectImage />

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
  }
});

export default EventInfoCreation;
