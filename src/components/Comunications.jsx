import { View, StyleSheet } from "react-native";
import { IconButton } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";

const containerStyle = {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: -35,
    marginBottom: 10,
    marginLeft: 10,
}

const Comunications = ({ onComment, onWhatsapp, style = containerStyle}) => {


  return(
    <View style={style}>
      <IconButton
        icon={() => (
          <MaterialCommunityIcons
            name={"message-reply"}
            size={25}
            color={"#000000"}
          />
        )}
        style={styles.favoriteShareButton}
        onPress={onComment}
      />
      <IconButton
        icon={() => (
          <MaterialCommunityIcons
            name={'whatsapp'}
            size={25}
            color={"#000000"}
          />
        )}
        style={styles.favoriteShareButton}
        onPress={onWhatsapp}
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

export default Comunications;
