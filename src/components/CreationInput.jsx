import { View, StyleSheet } from "react-native";
import { TextInput } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CreationInput = ({ label, onChangeText, value, placeholder,
  multiline, numberOfLines, keyboardType, maxLength, icon }) => {

  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color="gray"
          style={styles.icon}
        />
      )}

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 350,
  },
  input: {
    flex: 1,
    width: 350,
    borderColor: 'gray',
    color: 'gray',
    tintColor: 'gray',
    marginBottom: 10
  },
  icon: {
    position: "absolute",
    zIndex: 10,
    top: -11,
    left: -10,
  },
});

export default CreationInput;
