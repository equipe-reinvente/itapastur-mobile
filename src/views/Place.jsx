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
  const [gotUser, setGotUser] = useState(false);
  const [heartIcon, setHeatIcon] = useState("heart-outline");

  const setFavoriteIcon = (isFavorite) => {
    if (isFavorite) setHeatIcon("heart");
    else setHeatIcon("heart-outline");
    console.log(heartIcon);
  }

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
      if (!favorite) {
        setFavorite(true);
        setFavoriteIcon(true);
        let enterprisesFavorite = user['liked_enterprises'].filter(item => item === placeData['id']);
        let userData = {
          enterprises: user['enterprises'],
          token: user['token'],
          liked_enterprises: enterprisesFavorite,
          user: user['user']
        };
        setUser(userData);
      }
      else {
        setFavorite(false);
        let userData = {
          enterprises: user['enterprises'],
          token: user['token'],
          liked_enterprises: user['liked_enterprises'].push(placeData['id']),
          user: user['user']
        };
        setUser(userData);
        setFavorite(false);
        setFavoriteIcon(false);
      }
      const response = await axios.post(
        'https://itapastur-api.fly.dev/like', {user_id: user['user']['id'], enterprise_id: placeData['id']},
        {
          headers: {
              Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error('Erro do Axios:', error.message);
      } else {
        console.error('Erro:', error.message);
      }
    }
  };

  const checkIfIsFavorite = async () => {
    if (gotUser === false) {
      try {
        setGotUser(true);
        const response = await axios.get(
          'https://itapastur-api.fly.dev/view_user/'+ user['user']['id'],
          {
          headers: {
              Authorization: `Bearer ${authToken}`,
          },
          }
        );
        let userData = {
          enterprises: response['data']['enterprises'],
          token: user['token'],
          liked_enterprises: response['data']['liked_enterprises'],
          user: response['data']['user']
        };
        const isFavorite = userData['liked_enterprises'].includes(placeData['id']);
        setUser(userData);
        setFavorite(isFavorite);
        setFavoriteIcon(isFavorite);
      } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Erro do Axios:', error.message);
        } else {
          console.error('Erro:', error.message);
        }
      }
    }
  };
  
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

      <Socials onFavorite={() => {addFavorite()}} onShare={() => {}} heartIcon={heartIcon}/>

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
