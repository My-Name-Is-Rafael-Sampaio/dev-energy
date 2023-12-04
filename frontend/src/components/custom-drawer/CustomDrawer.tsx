import React, { useContext, useState } from "react";
import { View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { IconButton, Text, Button } from "react-native-paper";

import { AppContext, UserContext } from "../../contexts/Main";

import NotificationFooterBar from "../notification-footer-bar/NotificationFooterBar";
import { styles } from "../css/GlobalStyles";

const CustomDrawer = (props) => {
  const { setUserIsLoggedIn } = useContext(AppContext);
  const {
    setToken,
    setUserId,
    userName,
    setUserName,
    setUserEmail,
    setAvailableMenuOptions,
  } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visibleNotificationFooterBar, setVisibleNotificationFooterBar] =
    useState(false);
  const [notificationFooterBarMessage, setNotificationFooterBarMessage] =
    useState("");

  const resetAppContexts = () => {
    const reset = () => {
      setUserIsLoggedIn(null);
    };

    reset();
  };

  const resetUserContexts = () => {
    const reset = () => {
      setToken(null);
      setUserId(null);
      setUserEmail(null);
      setUserName(null);
      setAvailableMenuOptions(null);
    };

    reset();
  };

  const handleLogoutButton = () => {
    try {
      setIsLoading(true);
      resetUserContexts();
      resetAppContexts();
    } catch (error) {
      setNotificationFooterBarMessage(
        "Ocorreu um erro ao fazer logout. Por favor, tente novamente."
      );
      onToggleNotificationFooterBar();
    } finally {
      setIsLoading(false);
    }
  };

  const onToggleNotificationFooterBar = () =>
    setVisibleNotificationFooterBar(!visibleNotificationFooterBar);

  const onDismissNotificationFooterBar = () => {
    setVisibleNotificationFooterBar(false);
    setNotificationFooterBarMessage("");
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={[
            styles[1],
            { borderBottomWidth: 1, borderBottomColor: "#000000", margin: 10 },
          ]}
        >
          <View style={styles[2]}>
            <View style={styles[2]}>
              <View style={styles[3]}>
                <IconButton
                  icon="account-circle"
                  iconColor="#000000"
                  size={120}
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
                  {userName}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <DrawerItemList {...props} />
        <View
          style={[
            styles[1],
            { borderTopWidth: 1, borderTopColor: "#000000", margin: 10 },
          ]}
        >
          <View style={styles[2]}>
            <View style={styles[3]}>
              <Button
                disabled={isLoading}
                loading={isLoading}
                icon={isLoading ? null : "logout"}
                mode="elevated"
                buttonColor="#ff0000"
                labelStyle={{ color: "#ffffff" }}
                style={[
                  styles[5],
                  {
                    width: 200,
                    padding: 2,
                    backgroundColor: !isLoading && "#ff0000",
                  },
                ]}
                onPress={handleLogoutButton}
              >
                {isLoading ? "Saindo..." : "Sair"}
              </Button>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      <NotificationFooterBar
        visible={visibleNotificationFooterBar}
        onDismiss={onDismissNotificationFooterBar}
        message={notificationFooterBarMessage}
      />
    </View>
  );
};

export default CustomDrawer;
