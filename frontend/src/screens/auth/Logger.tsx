import React, { useState, useEffect } from "react";
import { View, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";

import { TextInput, Button } from "react-native-paper";

import { styles, inputTheme } from "../../components/Main";

const Logger = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleLoggerButton = () => {
    dismissKeyboard();
    setIsLoading(true);
    navigation.navigate("authPages", { screen: "login" });
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles[1]}>
        <View style={styles[3]}>
          <TextInput
            left={<TextInput.Icon icon="account-outline" />}
            label="Usuário"
            style={styles[4]}
            theme={inputTheme}
            value={userName}
            onChangeText={(text) => setUserName(text)}
          />
        </View>
        <View style={styles[3]}>
          <TextInput
            left={<TextInput.Icon icon="lock-outline" />}
            label="Senha"
            secureTextEntry
            style={styles[4]}
            theme={inputTheme}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles[2]}>
          <View style={styles[3]}>
            <Button
              disabled={isLoading}
              loading={isLoading}
              icon={isLoading ? null : "content-save-outline"}
              mode="elevated"
              buttonColor="#008037"
              labelStyle={{ color: "#ffffff" }}
              style={[styles[5], { backgroundColor: !isLoading && "#008037" }]}
              onPress={handleLoggerButton}
            >
              {isLoading ? "Carregando..." : "Cadastrar"}
            </Button>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Logger;
