import { View, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SelectImage = ({ image, pickImage, editImage }) => {
  return (
    <View style={styles.container}>
      {image ? (
        <TouchableWithoutFeedback onPress={editImage}>
          <Image source={{ uri: image }} style={styles.imageContainer} />
        </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={pickImage}>
            <View style={styles.selectImageContainer}>
              <MaterialCommunityIcons name={ 'camera-plus' } size={50} color={"#B0B0B0"} />
              <View style={styles.plusCircleContainer}>
                <MaterialCommunityIcons name={ 'plus-circle' } size={40} color={"#000000"} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 350,
    height: 150,
  },
  imageContainer: {
    flex: 1,
    width: 350,
    height: 150,
    borderRadius: 8,
    marginBottom: 10
  },
  selectImageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    height: 120,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#8C8C8C",
    marginBottom: 12
  },
  plusCircleContainer: {
    position: "absolute",
    bottom: -15,
    right: -18,
  }
});

export default SelectImage;
