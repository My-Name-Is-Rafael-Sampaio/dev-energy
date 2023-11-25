import AsyncStorage from "@react-native-async-storage/async-storage";

// Função responsável por armazenar dados no AsyncStorage.
const storeData = async (key: string, value: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    throw error;
  }
};

// Função responsável por recuperar dados no AsyncStorage.
const recoverData = async (key: string): Promise<string | null> => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    throw error;
  }
};

// Função responsável por deletar dados no AsyncStorage.
const deleteData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw error;
  }
};

export { storeData, recoverData, deleteData };
