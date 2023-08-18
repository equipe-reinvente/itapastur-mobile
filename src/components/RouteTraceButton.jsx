import { View, StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RouteTraceButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Button
        title={"TRAÇAR ROTA"}
        trailing={() => (
          <MaterialCommunityIcons
            name={'car'}
            size={30}
            color={"#FFFFFF"}
          />
        )}
        style={styles.button}
        titleStyle={styles.buttonText}
        color="#1daf6e"
        contentContainerStyle={{height: 50}}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100
  },
  button: {
    width: 350,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16
  }
});

export default RouteTraceButton;
