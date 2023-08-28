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

const PlaceView = ({ navigation, route }) => {
  
  const { placeData } = route.params; 
  const { user, setUser, authToken } = GetContext();
  const [favorite, setFavorite] = useState(false);
  const [gotUser, setGotUser] = useState(false);
  const [heartIcon, setHeatIcon] = useState("heart-outline");
  const [comments, setComments] = useState([{"user_id": 2, "username": "Marcos", "comment": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa muito bom, recomendo para todos!", 'id': 0},
                                            {"user_id": 1, "username": "Homero", "comment": "brabo de mais, se podesse tava todo dia aí!", 'id': 1},
                                            {"user_id": 3, "username": "Lívia", "comment": "quase que não consigo acreditar que esse lugar realmente existe em itapajé! Amei S2", 'id': 2},
                                            {"user_id": 4, "username": "Cássio", "comment": "bom de mais", 'id': 3},
                                            {"user_id": 5, "username": "Meireles", "comment": "legal", 'id': 4},]);

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

  const handleShare = async () => {
    console.log(placeData);
    const message = `Venha conferir ${placeData['name']} no ItapasTur!`;
    const imageURI = placeData['image_one'];
    const link = 'https://itapastur-api.fly.dev/forward/'+placeData['id'];
    
    const shareOptions = {
      message: `${message} \n ${link}`,
      url: imageURI,
    };

    Share.share(shareOptions);

  };

  const handleOpenWhatsApp = () => {
    const url = `whatsapp://send?phone=${placeData['cellphone']}`;

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
        setFavoriteIcon(false);
        let userData = {
          enterprises: user['enterprises'],
          token: user['token'],
          liked_enterprises: user['liked_enterprises'].push(placeData['id']),
          user: user['user']
        };
        setUser(userData);
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

  const routeTrace = () => {
    let url = "";
    if (placeData['address']['street'] === null) {
      url = `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${placeData['address']['latitude']},${placeData['address']['longitude']}`;
    } else {
      const address = `${placeData['address']['street']}, ${placeData['address']['number']}`
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
    comments.forEach((comment, idx) => {
      length += comment.comment.length;
      if (length < 240) {
        newCommentsList.push(comment);
      } else if (idx < 1) {
        newCommentsList.push({"user_id": comment.user_id, "username": comment.username, "comment": comment.username.substring(0, 297) + "...", 'id': comment.id});
      }
    });

    return newCommentsList;
  }
  
  useEffect(() => {checkIfIsFavorite()})

  let favorites = formateFavorites(placeData['favorites']);


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

      <Socials onFavorite={() => {addFavorite()}} onShare={() => {handleShare()}} heartIcon={heartIcon}/>
      <Comunications onComment={() => {}} onWhatsapp={() => {handleOpenWhatsApp()}} style={styles.comunicationsContainer}/>
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
  },
});

export default PlaceView;
