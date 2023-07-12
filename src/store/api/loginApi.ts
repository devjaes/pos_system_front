import config from "../../../config/serverConfig";
import IUserResponse, {
  TClientsResponse,
  TEnterpriseResponse,
} from "../types/IUserResponses";

export const fetchLogin = async (username: string, password: string) => {
  try {
    const response = await fetch(`${config.API_REST_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    });

    if (!response.ok) {
      console.log("Error en la autenticación.");
      return;
    }
    const data = await response.json();
    const userData: IUserResponse = data.user;

    if (!userData) {
      console.log("Error en la autenticación");
      return;
    }

    if (userData.rol === "CLIENT") {
      const response = await fetch(
        `${config.API_REST_BASE_URL}/client/user/${userData.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("Error al obtener el cliente.");
        return;
      }
      const data = await response.json();
      const clientData: TClientsResponse = data.client;

      if (!clientData) {
        console.log("No se pudo obtener el cliente.");
        return;
      }

      return clientData;
    } else if (userData.rol === "COMPANY") {
      console.log("id: ", userData.id);
      const response = await fetch(
        `${config.API_REST_BASE_URL}/company/user/${userData.id as number}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("response: ", response);
        console.log("Error al obtener la empresa.");
        return;
      }
      const data = await response.json();
      const companyData: TEnterpriseResponse = data.company;

      if (!companyData) {
        console.log("No se pudo obtener la empresa.");
        return;
      }

      return companyData;
    }

    return userData;
  } catch (error) {
    console.log(error);
  }
};
