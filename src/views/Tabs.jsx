import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from './Home';
import Search from './Search';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation }) => {

    return (
        <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle:{height: 80, position: "absolute"}, tabBarHideOnKeyboard: 'true'}}>
            <Tab.Screen
                name="Iníco"
                component={Home}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="home" color={color} size={40} style={{opacity: focused ? 1 : 0.4, marginTop:10}}/>
                    ),
                    tabBarLabelStyle: {marginBottom: 10, fontSize: 12},
                    tabBarActiveTintColor: "black",
                }}
            />
            <Tab.Screen
                name="Busca"
                component={Search}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="magnify" color={color} size={40} style={{opacity: focused ? 1 : 0.4, marginTop:10}}/>
                    ),
                    tabBarLabelStyle: {marginBottom: 10, fontSize: 12},
                    tabBarActiveTintColor: "black",
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, focused}) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={40} style={{opacity: focused ? 1 : 0.4, marginTop:10}}/>
                    ),
                    tabBarLabelStyle: {marginBottom: 10, fontSize: 12},
                    tabBarActiveTintColor: "black",
                }}
            />
        </Tab.Navigator>
    );
};

export default Tabs;
