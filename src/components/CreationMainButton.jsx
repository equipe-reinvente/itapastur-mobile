import { View, StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";

const CreationMainButton = ({ buttonText, color, onPress }) => {
  return (
    <View style={styles.container}>
      <Button
        title={buttonText}
        titleStyle={styles.buttonText}
        color={color}
        contentContainerStyle={{height: 50}}
        onPress={onPress}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  },
  button: {
    width: 350,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16
  },
});

export default CreationMainButton;
