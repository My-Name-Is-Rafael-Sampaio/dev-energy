import React, { useState, useEffect } from "react";
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

import { Input, styles } from "../../components/Main";

type ItemType = {
  id: number;
  icon: string;
  name: string;
  price: number;
  watts: number;
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
  const [items, setItems] = useState<ItemType[]>([
    {
      id: 1,
      icon: "fridge-outline",
      name: "Geladeira",
      price: 36590.0,
      watts: 200,
    },
  ]);
  const [amountSpentMonthly, setAmountSpentMonthly] = useState<number>(0.0);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [itemIcon, setItemIcon] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemWatts, setItemWatts] = useState("");

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
    setItemIcon("");
    setItemName("");
    setItemPrice("");
    setItemWatts("");
  };

  const handleIncludeButton = () => {
    const itemNameMatched = findMostSimilarKey(itemName);

    const newItem: ItemType = {
      id: items.length + 1,
      icon: iconMapping[itemNameMatched],
      name: itemName,
      price: parseFloat(itemPrice),
      watts: parseInt(itemWatts),
    };

    setItems([...items, newItem]);
    setModalVisibility(false);
    clearFields();
  };

  useEffect(() => {
    const totalSpent = items.reduce(
      (acc, currentItem) => acc + currentItem.price,
      0
    );

    setAmountSpentMonthly(totalSpent);
  }, [items]);

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
                      value={itemIcon}
                      setValue={setItemIcon}
                    />
                  </View>
                  <View style={styles[3]}>
                    <Input
                      icon="pencil-outline"
                      label="Nome"
                      value={itemName}
                      setValue={setItemName}
                    />
                  </View>
                  <View style={styles[3]}>
                    <Input
                      icon="cash"
                      label="Preço"
                      value={itemPrice}
                      setValue={setItemPrice}
                    />
                  </View>
                  <View style={styles[3]}>
                    <Input
                      icon="lightning-bolt-outline"
                      label="Watts"
                      value={itemWatts}
                      setValue={setItemWatts}
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
                      onPress={handleIncludeButton}
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
          {items.map((item: ItemType, index) => (
            <View key={index}>
              <List.Item
                left={(props) => <List.Icon {...props} icon={item.icon} />}
                title={item.name}
                right={(props) => (
                  <View
                    {...props}
                    style={{ flexDirection: "column", alignItems: "center" }}
                  >
                    <Text {...props}>{formatValueToBRL(item.price)}</Text>
                    <Text {...props}>{`${item.watts}W`}</Text>
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
