import React from "react";

import { Snackbar } from "react-native-paper";

import { styles } from "../css/GlobalStyles";

const NotificationFooterBar = (props: any) => {
  return (
    <Snackbar
      visible={props.visible}
      onDismiss={props.onDismiss}
      style={styles[9]}
      action={{
        labelStyle: { color: "#ffffff" },
        label: "Fechar",
      }}
    >
      {props.message}
    </Snackbar>
  );
};

export default NotificationFooterBar;
