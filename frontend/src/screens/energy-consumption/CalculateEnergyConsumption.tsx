import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { stringSimilarity } from "string-similarity-js";

import {
  Text,
  IconButton,
  List,
  Modal,
  Portal,
  Button,
} from "react-native-paper";

import { includeDevice, loadDevicesByUser } from "../../services/Main";

import { Input, styles } from "../../components/Main";

type DeviceType = {
  userId: string;
  id: string;
  icon: string;
  name: string;
  powerConsumption: number;
};

// const formatValueToBRL = (value: number): string => {
//   return value.toLocaleString("pt-BR", {
//     style: "currency",
//     currency: "BRL",
//   });
// };

const iconMapping: { [key: string]: string } = {
  amplificador: "amplifier",
  "ar-condicionado": "air-conditioner",
  cafeteira: "coffee-maker-outline",
  "câmera de vigilância": "cctv",
  "cortador de grama": "mower",
  computador: "desktop-classic",
  "filtro de ar": "air-filter",
  geladeira: "fridge-outline",
  impressora: "printer",
  lâmpada: "ceiling-light-outline",
  liquidificador: "blender-outline",
  "micro-ondas": "microwave",
  "purificador de ar": "air-purifier",
  televisão: "television",
  "umidificador de ar": "air-humidifier",
  "ventilador de teto": "ceiling-fan",
};

const findMostSimilarKey = (input: string): string => {
  let bestMatch = "";
  let highestSimilarity = 0;

  for (const key of Object.keys(iconMapping)) {
    const currentSimilarity = stringSimilarity(
      input.toLowerCase(),
      key.toLowerCase()
    );
    if (currentSimilarity > highestSimilarity) {
      highestSimilarity = currentSimilarity;
      bestMatch = key;
    }
  }

  if (highestSimilarity > 0.5) {
    return bestMatch;
  }

  return input.toLowerCase();
};

const CalculateEnergyConsumption = () => {
  const [devices, setDevices] = useState<DeviceType[]>([]);
  const [amountSpentMonthly, setAmountSpentMonthly] = useState<number>(0.0);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [deviceIcon, setDeviceIcon] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [devicePrice, setDevicePrice] = useState("");
  const [devicePowerConsumption, setDevicePowerConsumption] = useState("");

  const registerDevice = async (
    userId: string,
    deviceIcon: string,
    deviceName: string,
    powerConsumption: number
  ) => {
    try {
      const response = await includeDevice(
        userId,
        deviceName,
        powerConsumption
      );
      const payload = JSON.parse(response);

      if (payload.status === 201) {
        console.log("Dispositivo cadastrado com sucesso");
      }
    } catch (error) {
      Alert.alert(
        "Alerta!",
        `${error}`,
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const getDevicesByUser = async () => {
    try {
      const response = await loadDevicesByUser(
        "d9d9bc19-eb39-4ec3-99e0-23dbc4671eb2"
      );
      const payload = JSON.parse(response);

      setDevices(payload);
    } catch (error) {
      Alert.alert(
        "Alerta!",
        `${error}`,
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const showModal = () => setModalVisibility(true);

  const hideModal = () => {
    setModalVisibility(false);
  };

  const containerStyle = {
    height: 400,
    backgroundColor: "white",
    margin: 15,
    borderRadius: 20,
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const clearFields = () => {
    setDeviceIcon("");
    setDeviceName("");
    // setDevicePrice("");
    setDevicePowerConsumption("");
  };

  const handleIncludeDeviceButton = async (
    deviceIcon: string,
    deviceName: string,
    devicePowerConsumption: number
  ) => {
    // const itemNameMatched = findMostSimilarKey(itemName);
    // const newItem: ItemType = {
    //   id: devices.length + 1,
    //   icon: iconMapping[itemNameMatched],
    //   name: itemName,
    //   price: parseFloat(itemPrice),
    //   watts: parseInt(itemWatts),
    // };
    // setDevices([...devices, newItem]);
    // setModalVisibility(false);
    // clearFields();

    if (!deviceIcon || !deviceName || !devicePowerConsumption) {
      Alert.alert(
        "Alerta!",
        "Os dados estão incompletos. Preencha todos os campos.",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );
      return;
    }

    await registerDevice(
      "d9d9bc19-eb39-4ec3-99e0-23dbc4671eb2",
      deviceIcon,
      deviceName,
      devicePowerConsumption
    );
  };

  useEffect(() => {
    const fectData = async () => {
      await getDevicesByUser();
    };

    fectData();
  }, []);

  // useEffect(() => {
  //   const totalSpent = devices.reduce(
  //     (acc, currentItem) => acc + currentItem.price,
  //     0
  //   );

  //   setAmountSpentMonthly(totalSpent);
  // }, [devices]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          padding: 5,
        }}
      >
        <View style={styles[2]}>
          <View style={styles[2]}>
            <View style={styles[3]}>
              <Text style={{ textAlign: "center" }}>Valor Gasto Mensal(W)</Text>
            </View>
            <View style={styles[3]}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  fontWeight: "bold",
                }}
              >
                {/* {formatValueToBRL(amountSpentMonthly)} */}
                R$
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "column" }}>
        <Portal>
          <Modal
            visible={modalVisibility}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View style={styles[1]}>
                <View style={styles[2]}>
                  <View style={styles[3]}>
                    <Input
                      icon="tag-outline"
                      label="Ícone"
                      value={deviceIcon}
                      setValue={setDeviceIcon}
                    />
                  </View>
                  <View style={styles[3]}>
                    <Input
                      icon="pencil-outline"
                      label="Nome"
                      value={deviceName}
                      setValue={setDeviceName}
                    />
                  </View>
                  {/* <View style={styles[3]}>
                    <Input
                      icon="cash"
                      label="Preço"
                      value={itemPrice}
                      setValue={setItemPrice}
                    />
                  </View> */}
                  <View style={styles[3]}>
                    <Input
                      icon="lightning-bolt-outline"
                      label="Watts"
                      value={devicePowerConsumption}
                      setValue={setDevicePowerConsumption}
                    />
                  </View>
                </View>
                <View style={styles[2]}>
                  <View style={styles[3]}>
                    <Button
                      icon="content-save-outline"
                      mode="elevated"
                      buttonColor="#008037"
                      labelStyle={{ color: "#ffffff" }}
                      style={[styles[5]]}
                      onPress={async () =>
                        await handleIncludeDeviceButton(
                          deviceIcon,
                          deviceName,
                          parseInt(devicePowerConsumption)
                        )
                      }
                    >
                      Incluir
                    </Button>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </Portal>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 15,
          }}
        >
          <Text style={{ textAlign: "center" }}>Equipamentos</Text>
          <IconButton icon="plus" size={20} onPress={showModal} />
        </View>
        <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
          {devices.map((item: DeviceType, index) => (
            <View key={index}>
              <List.Item
                left={(props) => <List.Icon {...props} icon={item.icon} />}
                title={item.name}
                right={(props) => (
                  <View
                    {...props}
                    style={{ flexDirection: "column", alignItems: "center" }}
                  >
                    {/* <Text {...props}>{formatValueToBRL(item.price)}</Text>
                    <Text {...props}>{`${item.watts}W`}</Text> */}
                  </View>
                )}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default CalculateEnergyConsumption;
