import React, { useState } from "react";
import { View, Keyboard, TouchableWithoutFeedback } from "react-native";

import { Button } from "react-native-paper";

import { signUp } from "../../services/Main";

import { Input, NotificationFooterBar, styles } from "../../components/Main";

const SignUp = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
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

  const handleSignUpButton = async () => {
    dismissKeyboard();

    if (!userEmail || !userName || !userPassword) {
      setNotificationFooterBarMessage(
        "Os dados estão incompletos. Preencha todos os campos."
      );
      onToggleNotificationFooterBar();
      return;
    }

    try {
      setIsLoading(true);

      const response = await signUp(userName, userEmail, userPassword);
      const payload = JSON.parse(response);

      if (payload.status === 201) {
        setNotificationFooterBarMessage("Seu cadastro foi um sucesso!");

        setTimeout(() => {
          navigation.navigate("authPages", { screen: "signIn" });
        }, 3000);
      }
    } catch (error) {
      setNotificationFooterBarMessage(error);
    } finally {
      setIsLoading(false);
      onToggleNotificationFooterBar();
    }
  };

  const onDismissNotificationFooterBar = () => {
    setVisibleNotificationFooterBar(false);
    setNotificationFooterBarMessage("");
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles[1]}>
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
              value={userPassword}
              setValue={setUserPassword}
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
                style={[
                  styles[5],
                  { backgroundColor: !isLoading && "#008037" },
                ]}
                onPress={handleSignUpButton}
              >
                {isLoading ? "Carregando..." : "Cadastrar"}
              </Button>
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

export default SignUp;
