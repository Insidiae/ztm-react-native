import React from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

import { RestaurantInfoCard } from "../components/RestaurantInfoCard.component";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px;`}
`;

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantListContainer = styled(View)`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
`;

export const RestaurantsScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeArea>
      <SearchContainer>
        <Searchbar
          placeholder="Search"
          onChangeText={handleChangeSearch}
          value={searchQuery}
        />
      </SearchContainer>
      <RestaurantListContainer>
        <RestaurantInfoCard />
      </RestaurantListContainer>
    </SafeArea>
  );
};
