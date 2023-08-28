import { useState } from 'react';
import { View, StyleSheet, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useEnterprise } from "../contexts/EnterpriseContext";
import { GetContext } from "../components/AppContext";
import BackNavigationButton from '../components/BackNavigationButton';
import CreationTitle from '../components/CreationTitle';
import CreationMainButton from "../components/CreationMainButton";
import SelectImage from '../components/SelectImage';

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

  const editImage = async (imageIndex) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageURI = result.assets[0].uri;

      setEnterpriseData((prevState) => {
        const updatedImages = [...prevState.images];
        updatedImages[imageIndex] = imageURI;
  
        return {
          ...prevState,
          images: updatedImages,
        };
      });
    }
  }

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

  const handleBackButton = () => navigation.navigate('EnterpriseAddressCreation');

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
      <BackNavigationButton
        size={40}
        color={"#1DAF6E"}
        handleBackButton={handleBackButton}
      />
      <View style={styles.content}>
        <CreationTitle
          title={"Mostre seu empreendimento\nao mundo!"}
          description={"Esse é o momento de caprichar!"}
        />
        <SelectImage
          image={enterpriseData.images[0]}
          pickImage={pickImage}
          editImage={() => editImage(0)}
        />
  
        <SelectImage
          image={enterpriseData.images[1]}
          pickImage={pickImage}
          editImage={() => editImage(1)}
        />

        <SelectImage
          image={enterpriseData.images[2]}
          pickImage={pickImage}
          editImage={() => editImage(2)}
        />
      </View>
      <CreationMainButton
        buttonText={"FINALIZAR CADASTRO"}
        color={"#1daf6e"}
        onPress={handleFinishButton}
        style={styles.creationButton}
      />
      <Toast />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: '100%',
    height: '100%',
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 75,
    marginBottom: '10%',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    width: 350,
    marginRight: '50%',
    height: '100%',
    marginLeft: 175,
    marginBottom: 30,
  },
  creationButton: {
    position: 'relative',
    marginTop: 50,
    width: '100%',
    marginRight: 15,
    alignItems: 'center'
  }
});

export default EnterpriseImageCreation;
