import { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Image, ScrollView } from "react-native";
import { Text, Button } from "@react-native-material/core";
import { IconButton } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useEnterprise } from "../contexts/EnterpriseContext";
import { GetContext } from "../components/AppContext";

const EnterpriseImageCreation = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { enterpriseData, setEnterpriseData } = useEnterprise();
  const { authToken, user } = GetContext();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageURI = result.assets[0].uri;

      setEnterpriseData((prevState) => ({
        ...prevState,
        images: [...prevState.images, imageURI],
      }));
    }
  };

  const getLongitudeAndLatitudeFromAdddress = () => {

  };

  const buildEnterpriseFormData = () => {
    const data = new FormData();

    let image1Format = enterpriseData.images[0].split(".")[enterpriseData.images[0].split(".").length - 1];
    let image2Format = enterpriseData.images[1].split(".")[enterpriseData.images[1].split(".").length - 1];
    let image3Format = enterpriseData.images[2].split(".")[enterpriseData.images[2].split(".").length - 1];
    
    data.append('name', enterpriseData.name);
    data.append('description', enterpriseData.description);
    data.append('cellphone', enterpriseData.phoneNumber);
    data.append('user_id', user['user']['id']); 
    data.append('category_id', enterpriseData.category);
    data.append('street', enterpriseData.streetAddress);
    data.append('number', enterpriseData.addressNumber);
    data.append('neighborhood', enterpriseData.neighborhoodAddress);
    data.append('latitude', -31.240); 
    data.append('longitude', -32.100); 
    data.append('image_one', {
      uri: enterpriseData.images[0],
      name: 'image.'+image1Format,
      type: 'image/'+image1Format,
    });
    data.append('image_two', {
      uri: enterpriseData.images[1],
      name: 'image.'+image2Format,
      type: 'image/'+image2Format,
    });
    data.append('image_three', {
      uri: enterpriseData.images[2],
      name: 'image.'+image3Format,
      type: 'image/'+image3Format,
    });

    console.log(data);

    return data;
  };

  const handleTopLeftButton = () => navigation.navigate('EnterpriseAddressCreation');

  const handleFinishButton = async () => {
    const data = buildEnterpriseFormData();
    const enterprisesURL = 'https://itapastur-api.fly.dev/enterprises/';

    setLoading(true);

    try {
      const response = await axios.post(
        enterprisesURL,
        data,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 200) {
        setLoading(false);
        navigation.navigate('Perfil');
      } else {
        setLoading(false);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: error.message,
        visibilityTime: 2000,
      });
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topLeftButton}>
        <IconButton
          icon={() => (
            <MaterialCommunityIcons
              name={'chevron-left'}
              size={40}
              color={"#1DAF6E"}
            />
          )}
          onPress={handleTopLeftButton}
        />
      </View>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Mostre seu empreendimento ao mundo!</Text>
            <Text style={styles.description}>Esse é o momento de caprichar!</Text>
          </View>

          {enterpriseData.images[0] ? (
            <Image source={{ uri: enterpriseData.images[0] }} style={styles.imageContainer}/>
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

          {enterpriseData.images[1] ? (
            <Image source={{ uri: enterpriseData.images[1] }} style={styles.imageContainer}/>
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

          {enterpriseData.images[2] ? (
            <Image source={{ uri: enterpriseData.images[2] }} style={styles.imageContainer}/>
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

        <View style={styles.buttonContainer}>
          <Button
            title={"FINALIZAR CADASTRO"}
            titleStyle={styles.buttonText}
            color="#1daf6e"
            contentContainerStyle={{height: 50}}
            onPress={handleFinishButton}
            style={styles.button}
            loading={loading}
          />
        </View>
      <Toast />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: '100%',
    justifyContent: "space-between",
    marginRight: 15,
    marginLeft: 15,
    marginTop: 75,
    marginBottom: 0,
  },
  scrollViewContainer: {
    position: 'relative',
    alignItems: 'center',
    alignContent: 'center',
    paddingBottom: 120,
  },
  topLeftButton: {
    position: "absolute",
    top: -25,
    left: -20,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    width: 350,
    marginRight: '50%',
    marginLeft: 175,
    marginBottom: 30,
  },
  textContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  title: {
    fontSize: 42,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5
  },
  description: {
    fontSize: 20,
    textAlign: "center",
    color: "#5E5E5E"
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
    marginBottom: 12,
  },
  imageContainer: {
    width: 350,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  plusCircleContainer: {
    position: "absolute",
    bottom: -15,
    right: -18,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginRight: '50%',
    marginLeft: 175,
    marginBottom: "10%"
  },
  button: {
    width: 350,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16
  }
});

export default EnterpriseImageCreation;
