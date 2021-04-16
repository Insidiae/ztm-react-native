import React from "react";
// import { Platform } from "react-native";
// import WebView from "react-native-webview";
import styled from "styled-components/native";

import { Text } from "../typography/Text.component";

const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

//! This CompactWebView element was supposed to be displayed on an Android device, but it throws a net::ERR_CACHE_MISS error on the Android 5.1 device I'm testing this on.
//! (see https://github.com/react-native-webview/react-native-webview/issues/1101)

//! For now, I've reverted back to using to using CompactImage instead, as it does seem to properly display the restaurant photo on my device.
// const CompactWebView = styled(WebView)`
//   border-radius: 10px;
//   width: 120px;
//   height: 100px;
// `;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

// const isAndroid = Platform.OS === "android";

export const CompactRestaurantInfo = ({ restaurant, isMapCallout }) => {
  const { name, photos } = restaurant;
  // const Photo = isAndroid && isMapCallout ? CompactWebView : CompactImage;

  return (
    <Item>
      <CompactImage source={{ uri: photos[0] }} />
      <Text center variant="caption" numberOfLines={3}>
        {name}
      </Text>
    </Item>
  );
};
