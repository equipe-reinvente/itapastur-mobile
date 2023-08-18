import { View, StyleSheet } from "react-native";
import { IconButton } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Socials = ({ onFavorite, onShare }) => {
  return(
    <View style={styles.container}>
      <IconButton
        icon={() => (
          <MaterialCommunityIcons
            name={'heart-outline'}
            size={25}
            color={"#000000"}
          />
        )}
        style={styles.favoriteShareButton}
        onPress={onFavorite}
      />
      <IconButton
        icon={() => (
          <MaterialCommunityIcons
            name={'share-variant'}
            size={25}
            color={"#000000"}
          />
        )}
        style={styles.favoriteShareButton}
        onPress={onShare}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: -35,
    marginBottom: 10,
    marginLeft: 10,
  },
  favoriteShareButton: {
    height: 35,
    width: 35,
    marginHorizontal: 3,
    borderRadius: 10,
    backgroundColor: "#1daf6e"
  },
});

export default Socials;
