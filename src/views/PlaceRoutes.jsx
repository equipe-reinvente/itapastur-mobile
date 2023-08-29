import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaceView from "./Place";
import Chat from "./Chat";

const Stack = createNativeStackNavigator();

const PlaceRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PlaceView"
                component={PlaceView}
                options={{ title: "PlaceView", headerShown: false }}
            />
            <Stack.Screen
                name="Chat"
                component={Chat}
                options={{ title: "Chat", headerShown: false }}
            />
        </Stack.Navigator>
    )
};

export default PlaceRoutes;