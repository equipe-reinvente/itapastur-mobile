import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "@react-native-material/core";
import { useEnterprise } from "../contexts/EnterpriseContext";
import SelectDropdown from "react-native-select-dropdown";

const CreateEnterprise = () => {
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

  return (
    <View>
      <Text>Crie seu Empreendimento</Text>
      <Text>Divulgue seu empreendimento no Itapas tur!</Text>

      <TextInput
        label="Nome"
        variant="outlined"
        autoCapitalize='none'
        onChangeText={onChangeNameInput}
        color='gray'
        value={enterpriseData.name}
        placeholder="Açaí da Pedra do Frade"
        style={styles.nameInput}
      />

      <SelectDropdown
        data={categories}
        defaultValue={categories[0]}
        onSelect={(selectedItem) => onSelectCategory(selectedItem)}
        buttonStyle={styles.selectDropdown}
        dropdownStyle={styles.dropdown}
      />

      <TextInput
        label="Descrição"
        variant="outlined"
        autoCapitalize='none'
        onChangeText={onChangeDescriptionInput}
        color='gray'
        value={enterpriseData.description}
        placeholder="Venda seu peixe aqui! :)"
        style={styles.nameInput}
      />

      <TextInput
        label="Número de Telefone"
        variant="outlined"
        autoCapitalize='none'
        onChangeText={onChangePhoneNumberInput}
        color='gray'
        value={enterpriseData.phoneNumber}
        placeholder="+ 55 85 99999-9999"
        style={styles.nameInput}
      />

      <Button
        title={"PRÓXIMA ETAPA"}
        titleStyle={styles.buttonText}
        color="#1daf6e"
        contentContainerStyle={{height: 50}}
        onPress={() => {}}
        style={styles.button}
      />

      <Text>{enterpriseData.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nameInput: {
    borderColor: 'gray',
    color: 'gray',
    tintColor: 'gray',
    marginBottom: 5
  },
  selectDropdown: {
    borderWidth: 0.8,
    borderColor: "gray",
    borderRadius: 3,
  },
  dropdown: {
    borderRadius: 3,
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

export default CreateEnterprise;
