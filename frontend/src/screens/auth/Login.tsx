import React, { useState, useContext } from "react";
import {
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import { UserContext } from "../../contexts/Main";
import { storeData } from "../../util/Main";

import { Text, TextInput, Button } from "react-native-paper";
import { styles, inputTheme } from "../../components/Main";

const Login = ({ navigation }) => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setToken,
    setUserId,
    setUserEmail,
    setUserName,
    setAvailableMenuOptions,
  } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleLoginButton = async () => {
    dismissKeyboard();
  };

  const handleLoggerButton = () => {
    navigation.navigate("authPages", { screen: "logger" });
  };

  //   if (isLoggedIn === null) {
  //     return <Loading />;
  //   }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles[1]}>
        <View style={styles[2]}>
          <View style={styles[3]}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles[12]}
            />
          </View>
          <View style={styles[3]}>
            <Text style={styles[13]}>Bem-vindo ao Pivete Energy</Text>
          </View>
        </View>
        <View style={styles[2]}>
          <View style={styles[3]}>
            <TextInput
              left={<TextInput.Icon icon="account-outline" />}
              label="Usuário"
              style={styles[10]}
              theme={inputTheme}
              value={user}
              onChangeText={(text) => setUser(text)}
            />
          </View>
          <View style={styles[3]}>
            <TextInput
              left={<TextInput.Icon icon="lock-outline" />}
              label="Senha"
              secureTextEntry
              style={styles[10]}
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
              labelStyle={{ color: "#ffffff" }}
              style={styles[14]}
              onPress={handleLoginButton}
            >
              {isLoading ? "Carregando..." : "Entrar"}
            </Button>
          </View>
          <View style={styles[3]}>
            <Text style={styles[15]} onPress={handleLoggerButton}>
              Cadastre-se
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
