import { View, StyleSheet } from "react-native";
import { Text, TextInput } from "@react-native-material/core";
import { useEnterprise } from "../contexts/EnterpriseContext";

const CreateEnterprise = () => {
  const { enterpriseData, setEnterpriseData } = useEnterprise();

  const onChangeNameInput = (name) => {
    setEnterpriseData((prevState) => ({
      ...prevState,
      name: name,
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
        style={styles.input}
      />

      <Text>{enterpriseData.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    color: 'gray',
    tintColor: 'gray',
    marginBottom: 5
  },
});

export default CreateEnterprise;
