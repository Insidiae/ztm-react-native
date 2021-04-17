import React from "react";

import {
  Title,
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
} from "../components/Account.styles";

import { Spacer } from "../../../components/spacer/Spacer.component";

export const AccountScreen = ({ navigation }) => {
  // do something
  return (
    <AccountBackground>
      <AccountCover />
      <Title>Meals to Go</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}>
          Login
        </AuthButton>
        <Spacer position="top" size="large">
          <AuthButton
            icon="email"
            mode="contained"
            onPress={() => navigation.navigate("Register")}>
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
