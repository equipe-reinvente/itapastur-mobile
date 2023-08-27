import { StyleSheet } from "react-native";
import { TextInput } from "@react-native-material/core";

const CreationInput = ({ label, onChangeText, value, placeholder,
  multiline, numberOfLines, keyboardType, maxLength }) => {

  return (
    <TextInput
      label={label}
      multiline={multiline}
      numberOfLines={numberOfLines}
      variant="outlined"
      autoCapitalize='none'
      onChangeText={onChangeText}
      color='gray'
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
      maxLength={maxLength}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    borderColor: 'gray',
    color: 'gray',
    tintColor: 'gray',
    marginBottom: 10
  },
});

export default CreationInput;
