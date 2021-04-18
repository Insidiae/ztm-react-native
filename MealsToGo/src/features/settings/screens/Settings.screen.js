import React, { useState, useContext, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { List, Avatar } from "react-native-paper";
import styled from "styled-components/native";
import { useFocusEffect } from "@react-navigation/native";

import { Spacer } from "../../../components/spacer/Spacer.component";
import { Text } from "../../../components/typography/Text.component";
import { SafeArea } from "../../../components/utility/SafeArea.component";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const AvatarContainer = styled.View`
  align-items: center;
`;

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);

  const [photo, setPhoto] = useState(null);

  const getProfilePicture = async (currentUser) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    setPhoto(photoUri);
  };

  useFocusEffect(
    useCallback(() => {
      getProfilePicture(user);
    }, [user]),
  );

  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          {photo ? (
            <Avatar.Image size={180} source={{ uri: photo }} />
          ) : (
            <Avatar.Icon size={180} icon="human" backgroundColor="#2182BD" />
          )}
        </TouchableOpacity>
        <Spacer position="top" size="large">
          <Text variant="label">{user.email}</Text>
        </Spacer>
      </AvatarContainer>
      <List.Section>
        <SettingsItem
          title="Favourites"
          description="View your favourites"
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate("Favourites")}
        />
        <SettingsItem
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
};
