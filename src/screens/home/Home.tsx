import React, { useEffect, useState, useContext } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { DataTable, Text, FAB, Portal } from "react-native-paper";

import { styles } from "../../components/Main";
import { UserContext } from "../../contexts/Main";
import { recoverData } from "../../util/Main";

const Home = ({ navigation }) => {
  return (
    <View style={styles[1]}>
      <View style={styles[2]}>
        <View style={styles[3]}>
          <Text style={styles[25]}>Hello World</Text>
        </View>
      </View>
    </View>
  );
};

export default Home;
