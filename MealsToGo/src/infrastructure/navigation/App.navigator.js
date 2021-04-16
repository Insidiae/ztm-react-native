import React from "react";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SafeArea } from "../../components/utility/SafeArea.component";

import { RestaurantsNavigator } from "./Restaurants.navigator";
import { MapScreen } from "../../features/map/screens/Map.screen";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: {
    focused: "md-restaurant",
    unfocused: "md-restaurant-outline",
  },
  Map: {
    focused: "md-map",
    unfocused: "md-map-outline",
  },
  Settings: {
    focused: "md-settings",
    unfocused: "md-settings-outline",
  },
};

const SettingsScreen = () => (
  <SafeArea>
    <Text>Settings!</Text>
  </SafeArea>
);

const createScreenOptions = ({ route }) => {
  const iconType = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ focused, color, size }) => {
      const iconName = focused ? iconType.focused : iconType.unfocused;
      return <Ionicons name={iconName} color={color} size={size} />;
    },
  };
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={createScreenOptions}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}>
        <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
