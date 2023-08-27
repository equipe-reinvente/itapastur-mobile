import { View, StyleSheet } from "react-native";
import { IconButton } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BackNavigationButton = ({ size, color, handleBackButton }) => {
  return (
    <View style={styles.button}>
      <IconButton
        icon={() => (
          <MaterialCommunityIcons
            name={'chevron-left'}
            size={size}
            color={color}
          />
        )}
        onPress={handleBackButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: -30,
    left: -15
  }
});

export default BackNavigationButton;
