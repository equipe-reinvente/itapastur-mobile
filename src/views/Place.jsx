import { View, StyleSheet, Linking, Share, Text } from "react-native";
import PlaceTitle from "../components/PlaceTitle";
import PlaceDescription from "../components/PlaceDescription";
import ImageCarousel from "../components/ImageCarousel";
import Socials from "../components/Socials";
import RouteTraceButton from "../components/RouteTraceButton";
import axios from "axios";
import { GetContext } from "../components/AppContext";
import { useEffect, useState } from "react";
import Comunications from "../components/Comunications";
import Comments from "../components/Comments";

//{"user_id": 5, "username": "Meireles", "comment": "legal", 'id': 4}

const PlaceView = ({ navigation }) => {
  
  const { user, setUser, authToken, currentPlaceData } = GetContext();
  const [favorite, setFavorite] = useState(false);
  const [heartIcon, setHeatIcon] = useState("heart-outline");
  const [comments, setComments] = useState([]);

  const setFavoriteIcon = (isFavorite) => {
    if (isFavorite) setHeatIcon("heart");
    else setHeatIcon("heart-outline");
    console.log(heartIcon);
  }

  const image = { source: {uri: currentPlaceData['image_one']}}

  const images = [
    { source: {uri: currentPlaceData['image_one']} },
    { source: {uri: currentPlaceData['image_two']} },
    { source: {uri: currentPlaceData['image_three']} }
  ];

  const addFavorite = () => {
    console.log(user);
    modifyFavoritesOnDatabase();
  }

  const handleShare = async () => {
    console.log(currentPlaceData);
    const message = `Venha conferir ${currentPlaceData['name']} no ItapasTur!`;
    const imageURI = currentPlaceData['image_one'];
    const link = 'https://itapastur-api.fly.dev/forward/'+currentPlaceData['id'];
    
    const shareOptions = {
      message: `${message} \n ${link}`,
      url: imageURI,
    };

    Share.share(shareOptions);

  };

  const handleOpenWhatsApp = () => {
    const url = `whatsapp://send?phone=${currentPlaceData['cellphone']}`;

    Linking.openURL(url)
      .catch(() => {
        console.error('Não é possível abrir o WhatsApp');
      });
  };

  const modifyFavoritesOnDatabase = async () => {
    try {
      if (!favorite) {
        setFavorite(true);
        setFavoriteIcon(true);
        let enterprisesFavorite = user['liked_enterprises'].filter(item => item === currentPlaceData['id']);
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
        setFavoriteIcon(false);
        let userData = {
          enterprises: user['enterprises'],
          token: user['token'],
          liked_enterprises: [...user['liked_enterprises'], currentPlaceData['id']],
          user: user['user']
        };
        setUser(userData);
      }
      const response = await axios.post(
        'https://itapastur-api.fly.dev/like', {user_id: user['user']['id'], enterprise_id: currentPlaceData['id']},
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
    try {
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
      const isFavorite = userData['liked_enterprises'].includes(currentPlaceData['id']);
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
  };

  const routeTrace = () => {
    let url = "";
    if (currentPlaceData['address']['street'] === null) {
      url = `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${currentPlaceData['address']['latitude']},${currentPlaceData['address']['longitude']}`;
    } else {
      const address = `${currentPlaceData['address']['street']}, ${currentPlaceData['address']['number']}`
      const encodedAddress = encodeURIComponent(address);
      url = `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${encodedAddress}`;
    }

    Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        console.error("Google Maps não está instalado.");
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(error => console.error("Erro ao abrir Google Maps:", error));
  };

  const formateFavorites = (favorites) => {
    const favoritesCount = favorites;
    favorites = favorites.toString();

    if (favoritesCount > 1000 && favoritesCount < 1000000) {
        favorites = favorites.substring(0, favorites.length - 4) + "K";
    } else if (favoritesCount > 1000000 && favoritesCount < 1000000000) {
        favorites = favorites.substring(0, favorites.length - 7) + "M";
    } else if (favoritesCount >= 1000000000) {
        favorites = favorites.substring(0, favorites.length - 10) + "B";
    }

    return favorites;
  };

  const selectFrontPageComments = () => {
    let length = 0;
    let newCommentsList = [];
    if (comments.length > 0) {
      comments.forEach((comment, idx) => {
        length += comment.text_content.length;
        if (length < 240 && idx < 5) {
          newCommentsList.push(comment);
        } else if (idx < 1) {
          newCommentsList.push({"enterprise_id": comment.enterprise_id, "user_id": comment.user_id, "user_name": comment.user_name, "text_content": comment.text_content.substring(0, 297) + "...", 'id': comment.id});
        }
      });
    };

    return newCommentsList;
  }

  const openComments = () => {
    navigation.navigate("Chat", {comments, setComments, currentPlaceData});
  };

  const getComments = async () => {
    try {
      const response = await axios.get(
        'https://itapastur-api.fly.dev/enterprise/'+currentPlaceData['id']+"/comments",
        {
          headers: {
              Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setComments(response.data.comments);
    } catch (error) {console.log(error);};
  };
  
  useEffect(() => {checkIfIsFavorite(); getComments();}, []);

  let favorites = formateFavorites(currentPlaceData['favorites']);


  return (
    <View style={styles.container}>
      <PlaceTitle
        title={currentPlaceData['name']}
        category={currentPlaceData['category']}
        image={image}
      />

      <PlaceDescription description={currentPlaceData['description']} />

      <View style={styles.carouselContainer}>
        <ImageCarousel images={images}/>
      </View>

      <Socials onFavorite={() => {addFavorite()}} onShare={() => {handleShare()}} heartIcon={heartIcon}/>
      <Comunications onComment={() => {openComments()}} onWhatsapp={() => {handleOpenWhatsApp()}} style={styles.comunicationsContainer}/>
      <Text style={styles.likesStyle}>{favorites} Likes</Text>
      <Comments comments={selectFrontPageComments()} style={styles.comments}/>

      <RouteTraceButton onPress={() => {routeTrace()}}/>
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
  comunicationsContainer: {
    position: 'relative',
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: -40,
    marginBottom: 10,
    marginLeft: "75%",
  },
  comments: {
    width: 320,
    maxHeight: 80,
    minHeight: 40,
    alignItems: 'flex-start',
  },
  likesStyle: {
    position: 'relative',
    width: 320,
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10
  }
});

export default PlaceView;
