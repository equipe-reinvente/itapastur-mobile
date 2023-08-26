import { View, StyleSheet } from "react-native";
import { IconButton } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";

const Socials = ({ onFavorite, onShare, isFavorite = false }) => {

  const[heartIcon, setHeatIcon] = useState("heart-outline");

  const favorite = () => {
    if (isFavorite) setHeatIcon("heart");
    else setHeatIcon("heart-outline");
    onFavorite();
  }

  return(
    <View style={styles.container}>
      <IconButton
        icon={() => (
          <MaterialCommunityIcons
            name={heartIcon}
            size={25}
            color={"#000000"}
          />
        )}
        style={styles.favoriteShareButton}
        onPress={() => {favorite()}}
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
