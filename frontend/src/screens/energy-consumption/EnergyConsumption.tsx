import React from "react";
import { View } from "react-native";

import { Text, IconButton } from "react-native-paper";

import { styles } from "../../components/Main";

const EnergyConsumption = ({ navigation }) => {
  const navigateTo = () => {
    navigation.navigate("energyConsumptionPages", {
      screen: "calculateEnergyConsumption",
    });
  };

  const handleFactoryIconButton = () => {
    navigateTo();
  };

  const handleHomeIconButton = () => {
    navigateTo();
  };

  return (
    <View style={styles[1]}>
      <View style={styles[2]}>
        <View style={styles[3]}>
          <Text
            style={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}
          >
            Escolha o Local Desejado
          </Text>
        </View>
        <View style={styles[2]}>
          <View style={styles[3]}>
            <IconButton
              mode="outlined"
              icon="factory"
              iconColor="#000000"
              size={150}
              onPress={handleFactoryIconButton}
            />
          </View>
          <View style={styles[3]}>
            <Text style={{ textAlign: "center", fontSize: 20 }}>Indústria</Text>
          </View>
        </View>
        <View style={styles[2]}>
          <View style={styles[3]}>
            <IconButton
              mode="outlined"
              icon="home"
              iconColor="#000000"
              size={150}
              onPress={handleHomeIconButton}
            />
          </View>
          <View style={styles[3]}>
            <Text style={{ textAlign: "center", fontSize: 20 }}>Domicílio</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EnergyConsumption;
