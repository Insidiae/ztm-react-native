import React, { useContext } from "react";
import { Text, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SafeArea } from "../../components/utility/SafeArea.component";

import { RestaurantsNavigator } from "./Restaurants.navigator";
import { MapScreen } from "../../features/map/screens/Map.screen";

import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";

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

const SettingsScreen = () => {
  const { onLogout } = useContext(AuthenticationContext);

  return (
    <SafeArea>
      <Text>Settings!</Text>
      <Button title="Log Out" onPress={() => onLogout()} />
    </SafeArea>
  );
};

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
    <FavouritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
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
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavouritesContextProvider>
  );
};
