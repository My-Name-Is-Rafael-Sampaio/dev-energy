import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    throw new Error("Error: Ocorreu um erro ao armazenar os dados.");
  }
};

const recoverData = async (key: string): Promise<any | null> => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    throw new Error("Error: Houve um erro ao recuperar os dados.");
  }
};

const deleteData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw new Error("Error: Ocorreu um erro ao deletar os dados.");
  }
};

export { storeData, recoverData, deleteData };
