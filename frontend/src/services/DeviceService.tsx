import React from "react";
import axios from "axios";

const baseUrl = "http://192.168.100.94:3333";

const includeDevice = async (
  userId: string,
  deviceName: string,
  powerConsumption: number
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/electronics/${userId}`,
      {
        name: deviceName,
        powerConsumption: powerConsumption,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return JSON.stringify(response);
  } catch (error) {
    throw new Error(
      "O processo de cadastro falhou. Por favor, tente se cadastrar novamente. "
    );
  }
};

const loadDevicesByUser = async (userId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/electronics/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // params: {
      //   userId: userId,
      // },
    });

    return JSON.stringify(response.data);
  } catch (error) {
    throw new Error("O carregamento dos dispositivos falhou. Tente novamente.");
  }
};

export { includeDevice, loadDevicesByUser };
