import React, { useState, useContext } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";

import {
  Title,
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  AuthInput,
  ErrorContainer,
} from "../components/Account.styles";

import { Spacer } from "../../../components/spacer/Spacer.component";
import { Text } from "../../../components/typography/Text.component";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const { onRegister, isLoading, error } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Meals to Go</Title>
      <AccountContainer>
        <AuthInput
          label="E-mail"
          textContextType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(value) => setEmail(value)}
          value={email}
        />
        <Spacer position="top" size="large">
          <AuthInput
            label="Password"
            secureTextEntry
            textContentType="password"
            autoCapitalize="none"
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
        </Spacer>
        <Spacer position="top" size="large">
          <AuthInput
            label="Confirm Password"
            secureTextEntry
            textContentType="password"
            autoCapitalize="none"
            onChangeText={(value) => setRepeatedPassword(value)}
            value={repeatedPassword}
          />
        </Spacer>
        {error && (
          <ErrorContainer>
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer position="top" size="large">
          {isLoading ? (
            <ActivityIndicator animating color={Colors.blue300} />
          ) : (
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() => onRegister(email, password, repeatedPassword)}>
              Register
            </AuthButton>
          )}
        </Spacer>
      </AccountContainer>
      <Spacer position="top" size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
