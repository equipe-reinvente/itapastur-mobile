import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GetContext } from '../components/AppContext';
import EventImageCarousel from '../components/EventImageCarousel';
import { IconButton } from '@react-native-material/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceCard from '../components/PlaceCard';
import CircularImageCard from '../components/CircularImageCard';
import { useNavigation } from '@react-navigation/native';

const images = [
    { source: require("../images/eventPlaceholder.png") },
    { source: require("../images/eventPlaceholder.png") },
    { source: require("../images/eventPlaceholder.png") },
    { source: require("../images/eventPlaceholder.png") },
    { source: require("../images/eventPlaceholder.png") }
];

const itemInfo = [
    {date: "26/01", time: "20:00"},
    {date: "26/01", time: "20:00"},
    {date: "26/01", time: "20:00"},
    {date: "26/01", time: "20:00"},
    {date: "26/01", time: "20:00"}
]

const Home = () => {

    const [notificationCount, setNotificationCount] = useState(0);
    const navigationPerfil = useNavigation();
    const {authToken, setPlacesData, placesData} = GetContext();
    const [notificationCountText, setNotificationCountText] = useState("");
    const [notificationCountBackgroundSize, setNotificationCountBackgroundSize] = useState(10);
    const [trendingPlaces, setTrendingPlaces] = useState([]);
    const [newPlaces, setNewPlaces] = useState([]);
    const [artisansPlaces, setArtisansPlaces] = useState([]);
    const [stores, setStores] = useState([]);

    const styles = StyleSheet.create({
        container: {
            position: 'relative',
            width: '100%',
            flex: 1,
            alignItems: 'center'
        },
        logo: {
            position: 'relative',
            height: 55,
            width: 75,
            marginTop: 20,
        },
        eventsContainer: {
            marginTop: 10,
            width: '100%'
        },
        header: {
            position: 'relative',
            alignItems: 'center',
            height: 90,
            marginTop: 10
        },
        bellIconButton: {
            position: 'relative',
        },
        overlayContainer: {
            position: 'absolute', 
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        notificationCounterBackground: {
            position: 'relative',
            backgroundColor: 'red',
            height: 10,
            minWidth: 10,
            maxWidth: 20,
            width: notificationCountBackgroundSize,
            top: -35,
            left: 25,
            borderRadius: 5,
            alignItems: 'center'
        },
        notificationCounterText: {
            position: 'relative',
            color: 'white',
            fontSize: 8
        },
        notificationContainer: {
            position: 'relative',
            left: 150,
            top: -60
        },
        imageCardContainer: {
            position: "relative",
            alignItems: 'flex-start',
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        trendingContentContainer: {
            position: 'relative',
            width: 100
        },
        title: {
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black',
        },
        scrollViewContainer: {
            position: 'relative',
            height: "100%",
            width: "stretch",
            paddingBottom: 170,
        },
        placeCardStyle: {
            position: "relative",
            borderRadius: 15, 
            height: 150, 
            width: 150,
            marginRight: 25,
            marginBottom: 25,
            overflow: 'hidden',
        },
        circularImageCardContainer: {
            position: "relative",
            alignItems: 'flex-start',
            width: 'stretch',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 20
        },
        newPlacesComponent: {
            position: 'relative',
        },
        titleContainer: {
            position: "relative",
            alignItems: 'flex-start',
            flexDirection: 'row',
            width: '100%',
            marginBottom: 20
        },
        scrollView: {
            position: 'relative',
        },
        contentContainer: {
            alignItems: 'center',
            paddingLeft: 25
        },
        storesContainer: {
            position: "relative",
            alignItems: 'flex-start',
            width: 'stretch',
            marginBottom: 20
        },
        storeImageCard: {
            position: "relative",
            alignItems: 'flex-start',
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            height: 70,
            marginBottom: 10
        }
    });

    const openNotifications = () => {
        try {
            navigationPerfil.navigate('Notifications');
        } catch (error) {console.log(error);}
    };

    const seeMoreRedirect = () => {

    };

    const getTrendingPlaces = (data) => {
        let places = data['lojas'].sort((a, b) => b['favorites'] - a['favorites']);
        places = places.concat(data['artesoes'].sort((a, b) => b['favorites'] - a['favorites']));
        places = places.concat(data['pontos'].sort((a, b) => b['favorites'] - a['favorites']));
        places = places.sort((a, b) => b['favorites'] - a['favorites']);
        const newData = places.slice(0, 4);
        setTrendingPlaces(newData);
    };

    const getStores = (data) => {
        //console.log(data['lojas'][0]);
        const newData = data['lojas'].sort((a, b) => b['favorites'] - a['favorites']).slice(0, 5);
        setStores(newData);
    };
    
    const getArtisans = (data) => {
        const newData = data['artesoes'].slice(0, 4);
        setNewPlaces(newData);
    };

    const getNewPlaces = (data) => {
        let places = data['lojas'].sort((a, b) => b['id'] - a['id']);
        places = places.concat(data['artesoes'].sort((a, b) => b['id'] - a['id']));
        places = places.concat(data['pontos'].sort((a, b) => b['id'] - a['id']));
        places = places.sort((a, b) => b['id'] - a['id']);
        const newData = places.slice(0, 4);
        setNewPlaces(newData);
    };

    const fetchCategories = async () => {
        try {
          const response = await axios.get(
            'https://itapastur-api.fly.dev/categories/enterprises',
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          let data = response.data["enterprises"];
          if (data !== placesData) setPlacesData(data);
          getArtisans(data);
          getStores(data);
          getTrendingPlaces(data);
          getNewPlaces(data);
          getNotificationCount();
        } catch (error) {
          console.error('Erro ao buscar categorias:', error);
        }
    };

    const renderTrendingPlaces = (item) => {
        return (
            <PlaceCard image={{uri: item['image_one']}} title={item['name']} style={styles.placeCardStyle} likes={item['favorites']} id={item['id']} key={item['id']}/>
        );
    };

    const renderCircularImageCard = (item) => {
        return (
            <CircularImageCard title={item['name']} id={item['id']} key={item['id']} image={{uri: item['image_one']}}/>
        );
    };

    const renderStores = (item) => {
        return (
            <View style={styles.storeImageCard} key={item['id']}>
                <CircularImageCard image={{uri: item['image_one']}} buttonStyle={{position: 'relative',
                                                                                height: '100%',
                                                                                width: 330}}/>
                <View style={{position: "relative", left: -10, zIndex: -1}}>
                    <Text style={{position: "relative", marginTop: 5}}>{item['name']}</Text>
                    <View style={{flexDirection: "row", alignItems: 'flex-start'}}>
                        <MaterialCommunityIcons
                            name={"heart"}
                            size={10}
                            color="rgba(255, 0, 0, 0.5)"
                            style={{position: 'relative', top: 1}}
                        />
                        <Text style={{color: "rgba(255, 0, 0, 0.5)", fontSize: 10, fontWeight: 'bold'}}>{item['likes']}</Text>
                        <Text style={{fontSize: 11, color: 'rgba(0, 0, 0, 0.5)'}}> · {item['category']}</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: 'flex-start'}}>
                        <MaterialCommunityIcons
                            name={"compass"}
                            size={10}
                            color="rgba(0, 0, 0, 0.5)"
                            style={{position: 'relative', top: 1}}
                        />
                        <Text style={{fontSize: 9, color: "rgba(0, 0, 0, 0.5)"}}> {item['address']['street']} {item['address']['number']}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const getNotificationCount = async () => {
        let count = 0;
        if (count < 10) setNotificationCountBackgroundSize(10);
        if (count >= 10) setNotificationCountBackgroundSize(15);
        if (count >= 100) setNotificationCountBackgroundSize(20);
        if (count > 999) setNotificationCountText("999+");
        else setNotificationCountText("" + count);
        setNotificationCount(count);
    };

    useEffect(() => fetchCategories, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require("../assets/logoBlack.png")} style={styles.logo}/>
                <View style={styles.notificationContainer}>
                    <IconButton icon={() => (
                        <MaterialCommunityIcons
                            name={"bell"}
                            size={35}
                            color={'black'}
                        />
                    )} style={styles.bellIconButton}
                    onPress={openNotifications}/>
                    {notificationCount > 0 && 
                    <View style={styles.notificationCounterBackground}>
                        <Text style={styles.notificationCounterText}>{notificationCountText}</Text>
                    </View>}
                </View>
            </View>
            <View style={styles.scrollViewContainer}>
                <ScrollView style={styles.scrollView} overScrollMode='never'>
                    <View style={styles.eventsContainer}>
                        <EventImageCarousel images={images} 
                        style={{position: 'relative', height: 102, width: 280, left: -20, borderRadius: 15}} 
                        itemInfo={itemInfo}
                        title={"Festa de Itapajé"}/>
                    </View>

                    <View style={styles.contentContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Mais Populares</Text>
                            <Text style={{
                                position: 'relative',
                                color: '#1DAF6E',
                                right: 0,
                                top: 6,
                                marginLeft: "37%"
                            }} onPress={seeMoreRedirect}>Ver mais</Text>
                        </View>
                        <View style={styles.imageCardContainer}>
                            {trendingPlaces.map(renderTrendingPlaces)}
                        </View>
                        
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Novos lugares para experimentar</Text>
                        </View>
                        
                        <View style={styles.circularImageCardContainer}>
                            {newPlaces.map(renderCircularImageCard)}
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Artesões Locais</Text>
                            <Text style={{
                                position: 'relative',
                                color: '#1DAF6E',
                                right: 0,
                                top: 6,
                                marginLeft: "35%"
                            }} onPress={seeMoreRedirect}>Ver mais</Text>
                        </View>
                        <View style={styles.imageCardContainer}>
                            {artisansPlaces.map(renderTrendingPlaces)}
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Lojas</Text>
                            <Text style={{
                                position: 'relative',
                                color: '#1DAF6E',
                                right: 0,
                                top: 6,
                                marginLeft: "61%"
                            }} onPress={seeMoreRedirect}>Ver mais</Text>
                        </View>
                        <View style={styles.circularImageCardContainer}>
                            {stores.map(renderStores)}
                        </View>
                    </View> 
                </ScrollView>
            </View>            
        </View>
    );
};

export default Home;