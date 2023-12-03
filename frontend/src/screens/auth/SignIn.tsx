import React, { useState, useContext } from "react";
import { View, Image, Keyboard, TouchableWithoutFeedback } from "react-native";

import { Text, Button } from "react-native-paper";

import { AppContext, UserContext } from "../../contexts/Main";
import { signIn } from "../../services/Main";

import { Input, NotificationFooterBar, styles } from "../../components/Main";

const SignIn = ({ navigation }) => {
  const { setUserIsLoggedIn } = useContext(AppContext);
  const { setUserId, setUserName } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [visibleNotificationFooterBar, setVisibleNotificationFooterBar] =
    useState(false);
  const [notificationFooterBarMessage, setNotificationFooterBarMessage] =
    useState("");

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onToggleNotificationFooterBar = () =>
    setVisibleNotificationFooterBar(!visibleNotificationFooterBar);

  const handleSignInButton = async () => {
    dismissKeyboard();

    try {
      setIsLoading(true);

      const response = await signIn(userEmail, userPassword);
      const payload = JSON.parse(response);

      if (payload.status !== 500 && payload.status !== 400) {
        setUserId(payload.data.sessions);
        setUserName(payload.data.name);
        setUserIsLoggedIn(true);
      } else {
        setNotificationFooterBarMessage("Credenciais Inválidas.");
        onToggleNotificationFooterBar();
      }
    } catch (error) {
      setNotificationFooterBarMessage(error);
      onToggleNotificationFooterBar();
    } finally {
      setIsLoading(false);
    }
  };

  const onDismissNotificationFooterBar = () => {
    setVisibleNotificationFooterBar(false);
    setNotificationFooterBarMessage("");
  };

  const handleSignUpButton = () => {
    navigation.navigate("authPages", { screen: "signUp" });
  };

  return (
    <View style={{ flex: 1 }}>
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
                icon="email-outline"
                label="E-mail"
                value={userEmail}
                setValue={setUserEmail}
              />
            </View>
            <View style={styles[3]}>
              <Input
                secureTextEntry={true}
                icon="lock-outline"
                label="Senha"
                value={userPassword}
                setValue={setUserPassword}
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
                style={[
                  styles[5],
                  { backgroundColor: !isLoading && "#008037" },
                ]}
                onPress={handleSignInButton}
              >
                {isLoading ? "Carregando..." : "Entrar"}
              </Button>
            </View>
            <View style={styles[3]}>
              <Text
                style={{ fontSize: 16, color: "#696969" }}
                onPress={handleSignUpButton}
              >
                Cadastre-se
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <NotificationFooterBar
        visible={visibleNotificationFooterBar}
        onDismiss={onDismissNotificationFooterBar}
        message={notificationFooterBarMessage}
      />
    </View>
  );
};

export default SignIn;
