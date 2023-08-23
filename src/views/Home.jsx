import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GetContext } from '../components/AppContext';
import EventImageCarousel from '../components/EventImageCarousel';
import { IconButton } from '@react-native-material/core';
import { useEffect, useState } from 'react';
import PlaceCard from '../components/PlaceCard';

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

const Home = ({ navigation }) => {

    const [notificationCount, setNotificationCount] = useState(0);
    const [notificationCountText, setNotificationCountText] = useState("");
    const [notificationCountBackgroundSize, setNotificationCountBackgroundSize] = useState(10);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            paddingRight: 0,
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
            height: 90
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
        trendingContainer: {
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
            alignItems: 'flex-start',
            width: '100%',
        },
        hyperlinkStyle: {
            position: 'relative',
            color: '#1DAF6E',
            marginRight: 2,
            left: "74%",
            top: -23,
        },
        placeCardStyle: {
            position: "relative", 
            borderRadius: 15, 
            height: 150, 
            width: 150,
            marginRight: 40,
            marginBottom: 40
        }
    });

    const openNotifications = () => {
        navigation.navigate('Notifications');
    };

    const seeMoreRedirect = () => {

    };

    const getNotificationCount = () => {
        let count = 0;
        if (count < 10) setNotificationCountBackgroundSize(10);
        if (count >= 10) setNotificationCountBackgroundSize(15);
        if (count >= 100) setNotificationCountBackgroundSize(20);
        if (count > 999) setNotificationCountText("999+");
        else setNotificationCountText("" + count);
        setNotificationCount(count);
    };

    useEffect(getNotificationCount, []);

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
                    onPress={() => openNotifications}/>
                    {notificationCount > 0 && 
                    <View style={styles.notificationCounterBackground}>
                        <Text style={styles.notificationCounterText}>{notificationCountText}</Text>
                    </View>}
                </View>
            </View>
            <View style={styles.scrollViewContainer}>
                <ScrollView>
                    <View style={styles.eventsContainer}>
                        <EventImageCarousel images={images} 
                        style={{position: 'relative', height: 102, width: 280, left: -20, borderRadius: 15}} 
                        itemInfo={itemInfo}
                        title={"Festa de Itapajé"}/>
                    </View> 

                    <Text style={styles.title}>Mais Populares</Text>
                    <Text style={styles.hyperlinkStyle} onPress={seeMoreRedirect}>Ver mais</Text>
                    <View style={styles.trendingContainer}>
                        <PlaceCard image={require("../assets/PedraDoFrade.jpg")} title='Pedra do Frade' style={styles.placeCardStyle}/>
                        <PlaceCard image={require("../assets/PedraDoFrade.jpg")} title='Pedra do Frade' style={styles.placeCardStyle}/>
                        <PlaceCard image={require("../assets/PedraDoFrade.jpg")} title='Pedra do Frade' style={styles.placeCardStyle}/>
                        <PlaceCard image={require("../assets/PedraDoFrade.jpg")} title='Pedra do Frade' style={styles.placeCardStyle}/>
                    </View>

                    <Text style={styles.title}>Últimos lugares que você curtiu</Text>
                </ScrollView>
            </View>            
        </View>
    );
};

export default Home;