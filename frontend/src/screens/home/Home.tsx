import React, { useState } from "react";
import { View, ScrollView } from "react-native";

import { Card, Avatar, Text } from "react-native-paper";

type CardType = {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  content: string[];
  image: string;
};

const LeftContent = ({ icon, ...props }: { icon: string }) => (
  <Avatar.Icon {...props} icon={icon} />
);

const imagePaths = {
  "lightning-bolt-outline": require("../../assets/lightning-bolt-outline.png"),
  cat: require("../../assets/cat.jpg"),
  "sine-wave": require("../../assets/sine-wave.jpg"),
};

const Home = ({ navigation }) => {
  const [cards, setCards] = useState<CardType[]>([
    {
      id: 1,
      icon: "lightning-bolt-outline",
      title: "Economia de Energia",
      subtitle: "Maximize a Eficiência e Minimize o Consumo",
      content: [
        "Aparelhos Eficientes: Escolha eletrodomésticos com alta classificação energética para diminuir o consumo de energia.",
        "Lâmpadas LED: Troque por LEDs para economizar energia e prolongar a vida útil das lâmpadas.",
        "Desligue em Standby: Desconectar dispositivos eletrônicos da tomada evita consumo desnecessário em standby.",
      ],
      image: "lightning-bolt-outline",
    },
    {
      id: 2,
      icon: "cat",
      title: "Gato de Luz (Roubo de Energia)",
      subtitle: "Consequências e Riscos do Roubo de Eletricidade",
      content: [
        "Prática Ilegal: Roubo de energia é crime e pode resultar em multas e até prisão.",
        "Riscos à Segurança: Conexões clandestinas representam riscos de curtos-circuitos e incêndios.",
        "Impacto Social: Afeta os custos para consumidores honestos e prejudica investimentos na infraestrutura elétrica.",
      ],
      image: "cat",
    },
    {
      id: 3,
      icon: "sine-wave",
      title: "Alternativas e Soluções Legais",
      subtitle: "Para Dificuldades Financeiras",
      content: [
        "Programas de Assistência: Procure programas de auxílio ou parcelamento oferecidos por empresas de energia.",
        "Uso Responsável: Adote práticas conscientes para reduzir o consumo sem recorrer a métodos ilegais.",
        "Energia Sustentável: Considere fontes alternativas, como energia solar, para reduzir dependência da rede elétrica convencional.",
      ],
      image: "sine-wave",
    },
  ]);

  return (
    <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 5,
        }}
      >
        {cards.map((cardItem: CardType, index) => (
          <View
            key={index}
            style={{
              flexDirection: "column",
              padding: 20,
            }}
          >
            <Card mode="elevated">
              <Card.Title
                left={(props) => (
                  <LeftContent {...props} icon={cardItem.icon} />
                )}
                titleNumberOfLines={2}
                title={cardItem.title}
                subtitleNumberOfLines={2}
                subtitle={cardItem.subtitle}
              />
              <Card.Content>
                {cardItem.content.map((contentItem, index) => (
                  <Text key={index} style={{ padding: 5 }}>
                    {contentItem}
                  </Text>
                ))}
              </Card.Content>
              <Card.Cover source={imagePaths[cardItem.image]} resizeMethod="auto" resizeMode="center" />
            </Card>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;
