import React, { ComponentType, useContext, useState, useEffect } from "react";

// Dependências que possibilitam a navegação.
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

// Componente de telas do menu lateral.
import { CustomDrawer } from "../Main";

// Componentes de telas do app.
import { Logger, Login, Home } from "../../screens/Main";

import { UserContext } from "../../contexts/Main";

import { recoverData } from "../../util/Main";

import {
  drawerNavigatorOptions,
  drawerAuthorizedScreenOptions,
  stackScreenDrawerOptions,
  stackScreenAuthPagesOptions,
  stackScreenLoginOptions,
  stackScreenLoggerOptions,
  IconName,
} from "../css/GlobalStyles";

type MenuOption = {
  key: number;
  name: string;
  icon: IconName;
  title: string;
  component: ComponentType<any>;
};

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const AuthPages = () => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Group>
        <Stack.Screen
          name="login"
          component={Login}
          options={stackScreenLoginOptions}
        />
        <Stack.Screen
          name="logger"
          component={Logger}
          options={stackScreenLoggerOptions}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const DrawerPages = () => {
  const { availableMenuOptions } = useContext(UserContext);

  const [menuOptions, setMenuOptions] = useState<MenuOption[]>([
    {
      key: 0,
      name: "home",
      icon: "home-outline",
      title: "Home",
      component: Home,
    },
  ]);

  useEffect(() => {
    if (availableMenuOptions !== undefined && availableMenuOptions !== null) {
      const arrayForced: number[] = [0];
      const filteredMenuOptions = menuOptions.filter((page) =>
        arrayForced.includes(page.key)
      );

      // const filteredMenuOptions = menuOptions.filter((page) =>
      //   availableMenuOptions.includes(page.key)
      // );

      setMenuOptions(filteredMenuOptions);
    }
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="home"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={drawerNavigatorOptions}
    >
      <Drawer.Group>
        {menuOptions.map((page) => (
          <Drawer.Screen
            key={page.key}
            name={page.name}
            component={page.component}
            options={drawerAuthorizedScreenOptions({
              icon: page.icon,
              title: page.title,
            })}
          />
        ))}
      </Drawer.Group>
    </Drawer.Navigator>
  );
};

const Navigation = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Group>
            <Stack.Screen
              name="drawerPages"
              component={DrawerPages}
              options={stackScreenDrawerOptions}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="authPages"
              component={AuthPages}
              options={stackScreenAuthPagesOptions}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
