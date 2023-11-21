import React, { useState, useEffect } from "react";
import { View, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { styles, inputTheme } from "../../components/Main";

const Logger = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [recognizedUserName, setRecognizedUserName] = useState("");
  const [messageError, setMessageError] = useState("");
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onToggleSnackBar = () => setVisibleSnackBar(!visibleSnackBar);

  const onDismissSnackBar = () => {
    setVisibleSnackBar(false);
    setMessageError("");
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles[1]}>
          <View style={styles[3]}>
            <TextInput
              left={<TextInput.Icon icon="key-outline" />}
              label="Palavra-Chave"
              style={styles[10]}
              theme={inputTheme}
              value={keyWord}
              onChangeText={(text) => setKeyWord(text)}
            />
          </View>
          <View style={styles[3]}>
            <TextInput
              left={<TextInput.Icon icon="account-outline" />}
              label="Usuário"
              style={styles[10]}
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
              style={styles[10]}
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
                labelStyle={{ color: "#ffffff" }}
                style={styles[11]}
                // onPress={handleLoggerButton}
              >
                {isLoading ? "Carregando..." : "Cadastrar"}
              </Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/* <SnackBar
        visible={visibleSnackBar}
        onDismiss={onDismissSnackBar}
        message={
          messageError
            ? messageError
            : `Olá ${recognizedUserName}, você foi reconhecido e já está cadastrado no app!`
        }
      /> */}
    </>
  );
};

export default Logger;
