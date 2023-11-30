import React, { useState, useContext } from "react";
import { View, Image, Keyboard, TouchableWithoutFeedback } from "react-native";

import { Text, Button } from "react-native-paper";

import { Input, styles } from "../../components/Main";
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
