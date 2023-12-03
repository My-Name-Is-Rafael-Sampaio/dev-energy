import React from "react";
import { View } from "react-native";

import { Text, IconButton } from "react-native-paper";

import { styles } from "../../components/Main";

const EnergyConsumption = ({ navigation }) => {
  const navigateTo = (rateType: number) => {
    navigation.navigate("energyConsumptionPages", {
      screen: "calculateEnergyConsumption",
      params: {
        rateType: rateType,
      },
    });
  };

  const handleFactoryIconButton = () => {
    navigateTo(1);
  };

  const handleHomeIconButton = () => {
    navigateTo(2);
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
            <Text
              style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
            >
              Indústria
            </Text>
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
            <Text
              style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
            >
              Domicílio
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EnergyConsumption;
