import React, { useState } from "react";
import { ScrollView } from "react-native";
import { List, Divider } from "react-native-paper";

import { RestaurantInfoCard } from "../components/RestaurantInfoCard.component";

import { SafeArea } from "../../../components/utility/SafeArea.component";

export const RestaurantDetailScreen = ({ route }) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);

  const handleBreakfast = () => setBreakfastExpanded((prevState) => !prevState);
  const handleLunch = () => setLunchExpanded((prevState) => !prevState);
  const handleDinner = () => setDinnerExpanded((prevState) => !prevState);
  const handleDrinks = () => setDrinksExpanded((prevState) => !prevState);

  const { restaurant } = route.params;
  return (
    <SafeArea>
      <ScrollView>
        <RestaurantInfoCard restaurant={restaurant} />
        <List.Section title="Menu">
          <List.Accordion
            title="Breakfast"
            left={(props) => <List.Icon {...props} icon="bread-slice" />}
            expanded={breakfastExpanded}
            onPress={handleBreakfast}>
            <List.Item title="Eggs Benedict" />
            <Divider />
            <List.Item title="Classic Breakfast" />
          </List.Accordion>
          <Divider />
          <List.Accordion
            title="Lunch"
            left={(props) => <List.Icon {...props} icon="hamburger" />}
            expanded={lunchExpanded}
            onPress={handleLunch}>
            <List.Item title="Burger w/ Fries" />
            <Divider />
            <List.Item title="Steak Sandwich" />
            <Divider />
            <List.Item title="Mushroom Soup" />
          </List.Accordion>
          <Divider />
          <List.Accordion
            title="Dinner"
            left={(props) => <List.Icon {...props} icon="food-variant" />}
            expanded={dinnerExpanded}
            onPress={handleDinner}>
            <List.Item title="Spaghetti Bolognese" />
            <Divider />
            <List.Item title="Veal Cutlet with Chicken Mushroom Rotini" />
            <Divider />
            <List.Item title="Steak Frites" />
          </List.Accordion>
          <Divider />
          <List.Accordion
            title="Drinks"
            left={(props) => <List.Icon {...props} icon="cup" />}
            expanded={drinksExpanded}
            onPress={handleDrinks}>
            <List.Item title="Coffee" />
            <Divider />
            <List.Item title="Tea" />
            <Divider />
            <List.Item title="Modelo" />
            <Divider />
            <List.Item title="Coke" />
            <Divider />
            <List.Item title="Fanta" />
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </SafeArea>
  );
};
