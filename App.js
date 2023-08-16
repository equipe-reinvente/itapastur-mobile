import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import Login from "./src/views/Login";
import Welcome from "./src/views/Welcome";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
