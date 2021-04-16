import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { Spacer } from "../spacer/Spacer.component";
import { Text } from "../typography/Text.component";
import { CompactRestaurantInfo } from "../restaurant/CompactRestaurantInfo.component";

const FavouritesWrapper = styled.View`
  padding: 10px;
`;

export const FavouritesBar = ({ favourites, onNavigate }) => {
  if (!favourites.length) {
    return null;
  }

  return (
    <FavouritesWrapper>
      <Spacer position="left" size="large">
        <Text variant="caption">Favourites</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((favourite) => {
          const key = favourite.name.split(" ").join("");
          return (
            <Spacer key={key} position="left" size="medium">
              <TouchableOpacity
                onPress={() =>
                  onNavigate("RestaurantDetail", {
                    restaurant: favourite,
                  })
                }>
                <CompactRestaurantInfo restaurant={favourite} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavouritesWrapper>
  );
};
