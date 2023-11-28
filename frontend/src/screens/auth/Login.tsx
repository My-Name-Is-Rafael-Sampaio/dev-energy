import React, { useState, useContext } from "react";
import { View, Image, Keyboard, TouchableWithoutFeedback } from "react-native";

import { Text, TextInput, Button } from "react-native-paper";

import { styles, inputTheme } from "../../components/Main";
import { AppContext } from "../../contexts/Main";

const Login = ({ navigation }) => {
  const { setUserIsLoggedIn } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleLoginButton = async () => {
    dismissKeyboard();
    setIsLoading(true);
    setUserIsLoggedIn(true);
  };

  const handleLoggerButton = () => {
    navigation.navigate("authPages", { screen: "logger" });
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles[1]}>
        <View style={styles[2]}>
          <View style={styles[3]}>
            <Image
              source={require("../../assets/logo.png")}
              style={{ width: 190, height: 70 }}
            />
          </View>
          <View style={styles[3]}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "#000000",
                padding: 5,
              }}
            >
              Bem-vindo ao Pivete Energy
            </Text>
          </View>
        </View>
        <View style={styles[2]}>
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
        </View>
        <View style={styles[2]}>
          <View style={styles[3]}>
            <Button
              disabled={isLoading}
              loading={isLoading}
              icon={isLoading ? null : "login"}
              mode="elevated"
              buttonColor="#008037"
              labelStyle={{ color: "#ffffff" }}
              style={[styles[5], { backgroundColor: !isLoading && "#008037" }]}
              onPress={handleLoginButton}
            >
              {isLoading ? "Carregando..." : "Entrar"}
            </Button>
          </View>
          <View style={styles[3]}>
            <Text
              style={{ fontSize: 16, color: "#696969" }}
              onPress={handleLoggerButton}
            >
              Cadastre-se
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
