import { View, StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";

const CreationMainButton = ({ buttonText, color, onPress, style= {position: 'relative',
                                                                  marginTop: 50,
                                                                  width: '100%',
                                                                  alignItems: 'center'} }) => {
  return (
    <View style={style}>
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
