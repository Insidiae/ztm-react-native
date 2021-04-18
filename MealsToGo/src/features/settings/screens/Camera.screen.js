import React, { useState, useEffect, useContext, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import { SafeArea } from "../../../components/utility/SafeArea.component";
import { Text } from "../../../components/typography/Text.component";

import { colors } from "../../../infrastructure/theme/colors";

const ProfileCamera = styled(Camera)`
  flex: 1;
`;

const ButtonContainer = styled.View`
  position: absolute;
  width: 100%;
  bottom: ${(props) => props.theme.space[3]};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
`;

const FlipButton = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  right: 16px;
  align-items: center;
`;

const TakePictureButton = styled.TouchableOpacity`
  align-items: center;
`;

export const CameraScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);

  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      await AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  if (hasPermission === null) {
    return (
      <SafeArea>
        <Text>Loading...</Text>
      </SafeArea>
    );
  }
  if (hasPermission === false) {
    return (
      <SafeArea>
        <Text>No access to camera</Text>
      </SafeArea>
    );
  }

  return (
    <ProfileCamera type={type} ref={(camera) => (cameraRef.current = camera)}>
      <FlipButton
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back,
          );
        }}>
        <MaterialIcons
          name="flip-camera-android"
          color={colors.ui.tertiary}
          size={32}
        />
      </FlipButton>
      <ButtonContainer>
        <TakePictureButton onPress={snap}>
          <MaterialIcons name="camera" color={colors.ui.tertiary} size={64} />
        </TakePictureButton>
      </ButtonContainer>
    </ProfileCamera>
  );
};
