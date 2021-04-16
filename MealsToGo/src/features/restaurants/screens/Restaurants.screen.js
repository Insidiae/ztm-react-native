import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import styled from "styled-components/native";

import { Search } from "../components/Search.component";
import { RestaurantInfoCard } from "../components/RestaurantInfoCard.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

import { Spacer } from "../../../components/spacer/Spacer.component";
import { SafeArea } from "../../../components/utility/SafeArea.component";

const LoadingContainer = styled.View`
  position: absolute;
  left: 50%;
  top: 50%;
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const RestaurantList = styled.FlatList.attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const RestaurantsScreen = ({ navigation }) => {
  const { restaurants, isLoading } = useContext(RestaurantsContext);

  return (
    <SafeArea>
      <Search />
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} color={Colors.blue300} animating />
        </LoadingContainer>
      )}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RestaurantDetail", {
                restaurant: item,
              })
            }>
            <Spacer position="bottom" size="large">
              <RestaurantInfoCard restaurant={item} />
            </Spacer>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
