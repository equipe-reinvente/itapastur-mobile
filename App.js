import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DeepLinkHandler from "./src/components/DeepLinkHandler";

import Login from "./src/views/Login";
import Welcome from "./src/views/Welcome";
import PlaceView from "./src/views/Place";
import Tabs from "./src/views/Tabs";
import Register from "./src/views/Register";
import Notifications from "./src/views/Notifications";
import EnterpriseInfoCreation from "./src/views/EnterpriseInfoCreation";
import EnterpriseAddressCreation from "./src/views/EnterpriseAddressCreation";
import EnterpriseImageCreation from "./src/views/EnterpriseImageCreation";
import EventInfoCreation from "./src/views/EventInfoCreation";
import EventAddressCreation from "./src/views/EventAddressCreation";

import { AuthProvider } from "./src/components/AppContext";
import { EnterpriseProvider } from "./src/contexts/EnterpriseContext";
import { EventProvider } from "./src/contexts/EventContext";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <AuthProvider>
      <EnterpriseProvider>
        <EventProvider>
        <NavigationContainer>
          <DeepLinkHandler />
          <Stack.Navigator>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ title: "Welcome", headerShown: false }}
            />
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{ title: "Tabs", headerShown: false }}
            />
            <Stack.Screen
              name="Place"
              component={PlaceView}
              options={{ title: "Place", headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "Login", headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ title: "Register", headerShown: false }}
            />
            <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{
                  title: "Notifications",
                  headerShown: false,
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="EnterpriseInfoCreation"
                component={EnterpriseInfoCreation}
                options={{
                  title: "EnterpriseInfoCreation",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="EnterpriseAddressCreation"
                component={EnterpriseAddressCreation}
                options={{
                  title: "EnterpriseAddressCreation",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="EnterpriseImageCreation"
                component={EnterpriseImageCreation}
                options={{
                  title: "EnterpriseImageCreation",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="EventInfoCreation"
                component={EventInfoCreation}
                options={{ title: "EventInfoCreation", headerShown: false }}
              />
              <Stack.Screen
                name="EventAddressCreation"
                component={EventAddressCreation}
                options={{ title: "EventAddressCreation", headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </EventProvider>
      </EnterpriseProvider>
    </AuthProvider>
  );
}
