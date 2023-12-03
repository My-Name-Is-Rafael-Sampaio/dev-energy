import React, { useContext, useState } from "react";
import { View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Avatar, Text, Button } from "react-native-paper";

import { AppContext, UserContext } from "../../contexts/Main";
import { styles } from "../css/GlobalStyles";

const CustomDrawer = (props) => {
  const { setUserIsLoggedIn } = useContext(AppContext);
  const { setUserId, userName, setUserName } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogoutButton = () => {
    try {
      setIsLoading(true);
      setUserId(null);
      setUserName(null);
      setUserIsLoggedIn(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

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
      <DrawerItemList {...props} />
      <View style={styles[1]}>
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
  );
};

export default CustomDrawer;
