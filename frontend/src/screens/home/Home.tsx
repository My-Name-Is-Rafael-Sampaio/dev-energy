import React, { useState } from "react";
import { View, ScrollView } from "react-native";

import { Card, Avatar, Text, Button } from "react-native-paper";

type CardType = {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  image: string;
};

const LeftContent = ({ icon, ...props }: { icon: string }) => (
  <Avatar.Icon {...props} icon={icon} />
);

const Home = ({ navigation }) => {
  const [cards, setCards] = useState<CardType[]>([
    {
      id: 1,
      icon: "lightning-bolt-outline",
      title: "Economia de Energia",
      subtitle: "Maximize a Eficiência e Minimize o Consumo",
      image: "https://picsum.photos/700",
    },
    {
      id: 2,
      icon: "cat",
      title: "Gato de Luz (Roubo de Energia)",
      subtitle: "Consequências e Riscos do Roubo de Eletricidade",
      image: "https://picsum.photos/700",
    },
    {
      id: 3,
      icon: "sine-wave",
      title: "Alternativas e Soluções Legais",
      subtitle: "Para Dificuldades Financeiras",
      image: "https://picsum.photos/700",
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
                <Text variant="titleLarge">Card title</Text>
                <Text variant="bodyMedium">Card content</Text>
              </Card.Content>
              <Card.Cover source={{ uri: cardItem.image }} />
            </Card>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;
