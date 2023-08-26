import { View, StyleSheet } from "react-native";
import PlaceTitle from "../components/PlaceTitle";
import PlaceDescription from "../components/PlaceDescription";
import ImageCarousel from "../components/ImageCarousel";
import Socials from "../components/Socials";
import RouteTraceButton from "../components/RouteTraceButton";
import axios from "axios";
import { GetContext } from "../components/AppContext";
import { useEffect, useState } from "react";

const PlaceView = ({ navigation, route }) => {
  
  const { placeData } = route.params; 
  const { user, setUser, authToken } = GetContext();
  const [favorite, setFavorite] = useState(false);

  const image = { source: {uri: placeData['image_one']}}

  const images = [
    { source: {uri: placeData['image_one']} },
    { source: {uri: placeData['image_two']} },
    { source: {uri: placeData['image_three']} }
  ];

  const addFavorite = () => {
    console.log(user);
    modifyFavoritesOnDatabase();
  }

  const modifyFavoritesOnDatabase = async () => {
    try {
      setFavorite(!favorite);
      const response = await axios.post(
        'https://itapastur-api.fly.dev/like', {user_id: user['id'], enterprise_id: placeData['id']},
        {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        }
      );
      console.log(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error('Erro do Axios:', error.message);
      } else {
        console.error('Erro:', error.message);
      }
    }
  }

  const checkIfIsFavorite = async () => {
    try {
      if(user['liked_enterprises'].includes(placeData['id'])) setFavorite(true);
    } catch{}
  }
  
  useEffect(() => {checkIfIsFavorite()})

  return (
    <View style={styles.container}>
      <PlaceTitle
        title={placeData['name']}
        category={placeData['category']}
        image={image}
      />

      <PlaceDescription description={placeData['description']} />

      <View style={styles.carouselContainer}>
        <ImageCarousel images={images}/>
      </View>

      <Socials onFavorite={() => {addFavorite()}} onShare={() => {}} isFavorite={favorite}/>

      <RouteTraceButton onPress={() => {}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 20
  },
  carouselContainer: {
    width: 450,
    height: 180,
    marginBottom: 90
  },
});

export default PlaceView;
