import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
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

import { UserContext } from "../../contexts/Main";

import { includeDevice, loadDevicesByUser } from "../../services/Main";

import { Input, NotificationFooterBar, styles } from "../../components/Main";

type DeviceType = {
  userId: string;
  icon: string;
  name: string;
  powerConsumption: number;
  consumptionTime: number;
};

const formatValueToBRL = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

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
  let bestMatchValue = "";
  let highestSimilarity = 0;
  const defaultIcon = "information-outline";

  for (const [key, value] of Object.entries(iconMapping)) {
    const currentSimilarity = stringSimilarity(
      input.toLowerCase(),
      key.toLowerCase()
    );
    if (currentSimilarity > highestSimilarity) {
      highestSimilarity = currentSimilarity;
      bestMatchValue = value;
    }
  }

  if (highestSimilarity > 0.5) {
    return bestMatchValue;
  }

  return defaultIcon;
};

const CalculateEnergyConsumption = ({ route }) => {
  const { rateType } = route.params;

  const { userId } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [devices, setDevices] = useState<DeviceType[]>([]);
  const [amountSpentMonthly, setAmountSpentMonthly] = useState<number>(0.0);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [deviceIcon, setDeviceIcon] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [devicePowerConsumption, setDevicePowerConsumption] = useState("");
  const [consumptionTime, setConsumptionTime] = useState("");
  const [visibleNotificationFooterBar, setVisibleNotificationFooterBar] =
    useState(false);
  const [notificationFooterBarMessage, setNotificationFooterBarMessage] =
    useState("");

  const onToggleNotificationFooterBar = () =>
    setVisibleNotificationFooterBar(!visibleNotificationFooterBar);

  const getDevicesByUser = async () => {
    try {
      const response = await loadDevicesByUser(userId);
      const payload = JSON.parse(response);

      setDevices(payload);
    } catch (error) {
      setNotificationFooterBarMessage(error);
      onToggleNotificationFooterBar();
    }
  };

  const showModal = () => setModalVisibility(true);

  const clearFields = () => {
    setDeviceIcon("");
    setDeviceName("");
    setDevicePowerConsumption("");
    setConsumptionTime("");
  };

  const hideModal = () => {
    setModalVisibility(false);
    clearFields();
  };

  const onDismissNotificationFooterBar = () => {
    setVisibleNotificationFooterBar(false);
    setNotificationFooterBarMessage("");
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

  const registerDevice = async (
    userId: string,
    deviceIcon: string,
    deviceName: string,
    powerConsumption: number,
    consumptionTime: number
  ) => {
    try {
      setIsLoading(true);

      const response = await includeDevice(
        userId,
        deviceIcon,
        deviceName,
        powerConsumption,
        consumptionTime
      );
      const payload = JSON.parse(response);

      if (payload.status === 201) {
        setAmountSpentMonthly(0.0);
        await getDevicesByUser();
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncludeDeviceButton = async (
    deviceIcon: string,
    deviceName: string,
    devicePowerConsumption: number,
    consumptionTime: number
  ) => {
    if (
      !deviceIcon ||
      !deviceName ||
      !devicePowerConsumption ||
      !consumptionTime
    ) {
      setNotificationFooterBarMessage(
        "Os dados estão incompletos. Preencha todos os campos."
      );
      onToggleNotificationFooterBar();
      return;
    }

    try {
      const deviceIconMatched = findMostSimilarKey(deviceIcon);

      await registerDevice(
        userId,
        deviceIconMatched,
        deviceName,
        devicePowerConsumption,
        consumptionTime
      );

      clearFields();
      hideModal();
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  };

  const calculateTotalConsumptionValue = (
    rateType: number,
    powerConsumption: number,
    consumptionTime: number
  ) => {
    let industrialRate = 365.2;
    let homeRate = 0.746;

    let dailyConsumptionKWh = 0.0;
    let costDiaryMWh = 0.0;
    let costDiary = 0.0;
    const daysMonth = 30;
    let monthlyCost = 0.0;

    if (rateType === 1) {
      dailyConsumptionKWh = (powerConsumption * consumptionTime) / 1000;
      costDiaryMWh = dailyConsumptionKWh / 1000;
      costDiary = costDiaryMWh * industrialRate;
      monthlyCost = costDiary * daysMonth;
    }

    if (rateType === 2) {
      dailyConsumptionKWh = (powerConsumption * consumptionTime) / 1000;
      costDiary = dailyConsumptionKWh * homeRate;
      monthlyCost = costDiary * daysMonth;
    }

    setAmountSpentMonthly((prevAmount) => prevAmount + monthlyCost);
  };

  useEffect(() => {
    const fectData = async () => {
      await getDevicesByUser();
    };

    fectData();
  }, []);

  useEffect(() => {
    const takeAction = () => {
      devices.map((deviceItem: DeviceType) => {
        const powerConsumption = deviceItem.powerConsumption;
        const consumptionTime = deviceItem.consumptionTime;

        calculateTotalConsumptionValue(
          parseInt(rateType),
          powerConsumption,
          consumptionTime
        );
      });
    };

    takeAction();
  }, [devices]);

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
                {formatValueToBRL(amountSpentMonthly)}
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
                  <View style={styles[3]}>
                    <Input
                      icon="lightning-bolt-outline"
                      label="Watts"
                      value={devicePowerConsumption}
                      setValue={setDevicePowerConsumption}
                    />
                  </View>
                  <View style={styles[3]}>
                    <Input
                      icon="clock-outline"
                      label="Tempo de Consumo"
                      value={consumptionTime}
                      setValue={setConsumptionTime}
                    />
                  </View>
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
                        [styles[5]],
                        { backgroundColor: !isLoading && "#008037" },
                      ]}
                      onPress={async () =>
                        await handleIncludeDeviceButton(
                          deviceIcon,
                          deviceName,
                          parseInt(devicePowerConsumption),
                          parseFloat(consumptionTime)
                        )
                      }
                    >
                      {isLoading ? "Incluindo..." : "Incluir"}
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
          {devices.map((deviceItem: DeviceType, index) => (
            <View key={index}>
              <List.Item
                left={(props) => (
                  <List.Icon {...props} icon={deviceItem.icon} />
                )}
                title={deviceItem.name}
                right={(props) => (
                  <View
                    {...props}
                    style={{ flexDirection: "column", alignItems: "center" }}
                  >
                    <Text
                      {...props}
                    >{`Tempo de Consumo ${deviceItem.consumptionTime} H`}</Text>
                    <Text
                      {...props}
                    >{`${deviceItem.powerConsumption} Watts`}</Text>
                  </View>
                )}
                style={{ borderBottomWidth: 1, borderBottomColor: "#000000" }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <NotificationFooterBar
        visible={visibleNotificationFooterBar}
        onDismiss={onDismissNotificationFooterBar}
        message={notificationFooterBarMessage}
      />
    </View>
  );
};

export default CalculateEnergyConsumption;
