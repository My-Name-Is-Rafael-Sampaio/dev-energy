import React, { useContext, useState, useEffect } from "react";
import { Alert, View, Pressable } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { UserContext } from "../../contexts/Main";
import { recoverData, deleteData } from "../../util/Main";

import { Avatar, Button, Text, Dialog, Portal } from "react-native-paper";
import { styles } from "../css/GlobalStyles";

const CustomDrawer = (props) => {
  const {
    setIsLoggedIn,
    token,
    setToken,
    userId,
    setUserId,
    setUserEmail,
    userName,
    setUserName,
    setAvailableMenuOptions,
  } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles[1]}>
        <View style={styles[2]}>
          <View style={styles[2]}>
            <View style={styles[3]}>
              <Avatar.Image
                size={100}
                source={require("../../assets/user.png")}
              />
            </View>
          </View>
          <View style={styles[3]}>
            <Text style={styles[5]}>{userName}</Text>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />
      <View style={styles[1]}>
        <View style={styles[2]}>
          <View style={styles[3]}>
            <Button
              disabled={isLoading}
              loading={isLoading}
              icon={isLoading ? null : "logout"}
              mode="elevated"
              labelStyle={{ color: "#ffffff" }}
              style={styles[8]}
              //   onPress={handleLogoutButton}
            >
              {isLoading ? "Saindo..." : "Sair"}
            </Button>
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
