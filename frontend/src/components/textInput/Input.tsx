import React from "react";

import { TextInput } from "react-native-paper";

import { styles, inputTheme } from "../css/GlobalStyles";

interface InputProps {
  secureTextEntry?: boolean;
  icon: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  secureTextEntry,
  icon,
  label,
  value,
  setValue,
}) => {
  return (
    <TextInput
      mode="outlined"
      outlineColor="#000000"
      secureTextEntry={secureTextEntry}
      left={<TextInput.Icon icon={icon} />}
      label={label}
      style={styles[4]}
      theme={inputTheme}
      textColor="#000000"
      value={value}
      onChangeText={(text) => setValue(text)}
    />
  );
};

export default Input;
