import React, { ComponentType, useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import CustomDrawer from "../custom-drawer/CustomDrawer";
import {
  SignUp,
  SignIn,
  Home,
  EnergyConsumption,
  CalculateEnergyConsumption,
} from "../../screens/Main";
import { AppContext, UserContext } from "../../contexts/Main";

import {
  stackScreenAuthPagesOptions,
  stackScreenSignUpOptions,
  stackScreenSignInOptions,
  IconName,
  drawerNavigatorOptions,
  drawerAuthorizedScreenOptions,
  stackScreenDrawerOptions,
  stackScreenCalculateEnergyConsumptionOptions,
  stackScreenEnergyConsumptionPagesOptions,
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
    <Stack.Navigator initialRouteName="signIn">
      <Stack.Group>
        <Stack.Screen
          name="signUp"
          component={SignUp}
          options={stackScreenSignUpOptions}
        />
        <Stack.Screen
          name="signIn"
          component={SignIn}
          options={stackScreenSignInOptions}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const DrawerPages = () => {
  const { availableMenuOptions } = useContext(UserContext);

  const [menuOptions, setMenuOptions] = useState<MenuOption[]>([
    {
      key: 1,
      name: "home",
      icon: "home-outline",
      title: "Home",
      component: Home,
    },
    {
      key: 2,
      name: "energy-consumption",
      icon: "calculator-outline",
      title: "Consumo de Energia",
      component: EnergyConsumption,
    },
  ]);

  useEffect(() => {
    if (availableMenuOptions !== undefined && availableMenuOptions !== null) {
      const arrayForced: number[] = [1, 2];
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

const EnergyConsumptionPages = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="calculateEnergyConsumption"
          component={CalculateEnergyConsumption}
          options={stackScreenCalculateEnergyConsumptionOptions}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const { userIsLoggedIn } = useContext(AppContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userIsLoggedIn ? (
          <Stack.Group>
            <Stack.Screen
              name="drawerPages"
              component={DrawerPages}
              options={stackScreenDrawerOptions}
            />
            <Stack.Screen
              name="energyConsumptionPages"
              component={EnergyConsumptionPages}
              options={stackScreenEnergyConsumptionPagesOptions}
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
