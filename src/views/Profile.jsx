import { View, Text, StyleSheet, Image } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Enterprises from './Enterprises';
import MainProfile from './MainProfile';

const Stack = createNativeStackNavigator();

const Profile = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainProfile"
                component={MainProfile}
                options={{ title: "MainProfile", headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
                name="Enterprises"
                component={Enterprises}
                options={{ title: "Enterprises", headerShown: false, animation: 'slide_from_right'}}
            />
        </Stack.Navigator>
    );
};

export default Profile;