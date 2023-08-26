import { View, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { useState } from "react";
import { useEnterprise } from "../contexts/EnterpriseContext";
import SelectDropdown from "react-native-select-dropdown";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { formatPhoneNumber, removeNonDigitCharactersPhone } from '../utils/formatPhoneNumber';
import BackNavigationButton from "../components/BackNavigationButton";
import CreationTitle from "../components/CreationTitle";
import CreationInput from "../components/CreationInput";
import CreationMainButton from "../components/CreationMainButton";

const EnterpriseInfoCreation = ({ navigation }) => {
  const { enterpriseData, setEnterpriseData } = useEnterprise();
  const [nameError, setNameError] = useState("");

  const categories = ["Ponto Turístico", "Artesão", "Lojas"];

  const onChangeNameInput = (name) => {
    setNameError("");
    setEnterpriseData((prevState) => ({
      ...prevState,
      name,
    }));
  };

  const isValidName = (name) => name.trim() !== "";

  const onSelectCategory = (category) => {
    if (category == "Ponto Turístico") category = "3";
    else if (category == "Artesão") category = "2";
    else if (category == "Lojas") category = "1";
    console.log(category);
    setEnterpriseData((prevState) => ({
      ...prevState,
      category,
    }));
  };

  const onChangeDescriptionInput = (description) => {
    setEnterpriseData((prevState) => ({
      ...prevState,
      description,
    }));
  };

  const onChangePhoneNumberInput = (phoneNumber) => {
    if (phoneNumber.length === 11) {
      setEnterpriseData((prevState) => ({
        ...prevState,
        phoneNumber: formatPhoneNumber(phoneNumber),
      }));
    } else {
      setEnterpriseData((prevState) => ({
        ...prevState,
        phoneNumber: removeNonDigitCharactersPhone(phoneNumber),
      }));
    }
  };

  const handleBackButton = () => navigation.goBack();

  const handleNextStepButton = () => {
    if (!isValidName(enterpriseData.name)) {
      setNameError("Por favor, preencha o campo Nome!");
      return;
    }
    navigation.navigate('EnterpriseAddressCreation');
  }

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
            title={"Crie seu Empreendimento"}
            description={"Divulgue seu empreendimento no Itapas tur!"}
          />

          <CreationInput
            label={"Nome"}
            onChangeText={onChangeNameInput}
            value={enterpriseData.name}
            placeholder={"Açaí da Pedra do Frade"}
          />

          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

          <CreationInput
            label={"Descrição"}
            multiline
            numberOfLines={8}
            onChangeText={onChangeDescriptionInput}
            value={enterpriseData.description}
            placeholder={"Venda seu peixe aqui! :)"}
          />

          <SelectDropdown
            data={categories}
            defaultValue={categories[0]}
            defaultButtonText={categories[0]}
            onSelect={(selectedItem) => onSelectCategory(selectedItem)}
            buttonStyle={styles.selectDropdown}
            buttonTextStyle={styles.selectDropdownText}
            renderDropdownIcon={isDropdownOpen => (
              <MaterialCommunityIcons
                name={ isDropdownOpen ? 'menu-up' : 'menu-down' }
                size={25}
                color={"#8c8c8c"}
              />
            )}
            dropdownStyle={styles.dropdown}
            rowTextStyle={styles.selectDropdownText}
          />

          <CreationInput
            label={"Número de Telefone"}
            onChangeText={onChangePhoneNumberInput}
            value={enterpriseData.phoneNumber}
            placeholder={"(85) 99999-9999"}
            keyboardType={"numeric"}
            maxLength={15}
          />
        </View>

        <CreationMainButton
          buttonText={"PRÓXIMA ETAPA"}
          color={"#1daf6e"}
          onPress={handleNextStepButton}
        />
      </View>
    </KeyboardAvoidingWrapper>
  );
}

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
  selectDropdown: {
    width: 350,
    borderWidth: 0.8,
    borderColor: "gray",
    borderRadius: 3,
    marginBottom: 10
  },
  selectDropdownText: {
    textAlign: "left"
  },
  dropdown: {
    borderRadius: 3,
    marginTop: -53,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  }
});

export default EnterpriseInfoCreation;
