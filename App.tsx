import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import HomeScreen from "./Screen/HomeScreen";
import WarehouseScreen from "./Screen/WarehouseScreen";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons'; 
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="Lager"
          component={HomeScreen}
          options={{
            tabBarIcon: () => (
              <FontAwesome5 name="warehouse" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen name="Skanna" component={WarehouseScreen} options={{
            tabBarIcon: () => (
              <MaterialIcons name="qr-code-scanner" size={24} color="black" />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
