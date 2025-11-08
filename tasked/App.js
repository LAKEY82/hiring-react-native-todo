import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./Screens/SplashScreen";
import { StatusBar } from "expo-status-bar";
import Dashboard from "./Screens/Dashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false,}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
