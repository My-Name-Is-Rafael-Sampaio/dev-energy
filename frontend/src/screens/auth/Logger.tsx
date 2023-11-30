import React, { useState } from "react";
import { View, Keyboard, TouchableWithoutFeedback } from "react-native";

import { Button } from "react-native-paper";

import { Input, styles } from "../../components/Main";

const Logger = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
          <Input
            icon="account-outline"
            label="Usuário"
            value={userName}
            setValue={setUserName}
          />
        </View>
        <View style={styles[3]}>
          <Input
            secureTextEntry={true}
            icon="lock-outline"
            label="Senha"
            value={password}
            setValue={setPassword}
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
