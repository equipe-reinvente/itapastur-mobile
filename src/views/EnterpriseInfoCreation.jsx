import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "@react-native-material/core";
import { useEnterprise } from "../contexts/EnterpriseContext";
import SelectDropdown from "react-native-select-dropdown";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const EnterpriseInfoCreation = ({ navigation }) => {
  const { enterpriseData, setEnterpriseData } = useEnterprise();

  const categories = ["Ponto Turístico", "Artesão", "Loja"];

  const onChangeNameInput = (name) => {
    setEnterpriseData((prevState) => ({
      ...prevState,
      name,
    }));
  };

  const onSelectCategory = (category) => {
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
    setEnterpriseData((prevState) => ({
      ...prevState,
      phoneNumber,
    }));
  };

  const handleNextStepButton = () => navigation.navigate('EnterpriseAddressCreation');

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Crie seu Empreendimento</Text>
            <Text style={styles.description}>Divulgue seu empreendimento no Itapas tur!</Text>
          </View>

          <TextInput
            label="Nome"
            variant="outlined"
            autoCapitalize='none'
            onChangeText={onChangeNameInput}
            color='gray'
            value={enterpriseData.name}
            placeholder="Açaí da Pedra do Frade"
            style={styles.input}
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

          <TextInput
            label="Descrição"
            variant="outlined"
            autoCapitalize='none'
            onChangeText={onChangeDescriptionInput}
            color='gray'
            value={enterpriseData.description}
            multiline
            numberOfLines={8}
            textAlignVertical="top"
            placeholder="Venda seu peixe aqui! :)"
            style={styles.input}
          />

          <TextInput
            label="Número de Telefone"
            variant="outlined"
            autoCapitalize='none'
            onChangeText={onChangePhoneNumberInput}
            color='gray'
            value={enterpriseData.phoneNumber}
            placeholder="+ 55 85 99999-9999"
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
    </KeyboardAvoidingWrapper>
  );
}

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
    fontSize: 40,
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

export default EnterpriseInfoCreation;
