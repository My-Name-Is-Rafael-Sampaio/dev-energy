import React from "react";
import axios from "axios";

const baseUrl = "http://192.168.100.94:3333";

const signUp = async (
  userName: string,
  userEmail: string,
  userPassword: string
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/signup`,
      {
        name: userName,
        email: userEmail,
        password: userPassword,
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

const signIn = async (userEmail: string, userPassword: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}/signin`,
      {
        email: userEmail,
        password: userPassword,
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
      "O processo de login falhou. Por favor, tente se logar novamente. "
    );
  }
};

export { signUp, signIn };
