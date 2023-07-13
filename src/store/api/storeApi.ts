import config from "../../../config/serverConfig";
import { IStoreResponse, IStoreUpdate } from "../types/IStore";

export const handleGetStore = async () => {
  try {
    const response = await fetch(`${config.API_REST_BASE_URL}/store`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("No se pudo obtener la tienda.");
      return;
    }
    const data = await response.json();
    const storeData: IStoreResponse = data;

    if (!storeData) {
      console.log("Error al obtener la tienda.");
      return;
    }

    return storeData;
  } catch (error) {
    console.log({ error });
  }
};

export const handleUpdateStore = async (storeData: IStoreUpdate) => {
  try {
    const response = await fetch(`${config.API_REST_BASE_URL}/store`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("No se pudo actualizar la tienda.");
      return;
    }
    const data = await response.json();
    const storeData: IStoreResponse = data;

    if (!storeData) {
      console.log("Error al actualizar la tienda.");
      return;
    }

    return storeData;
  } catch (error) {
    console.log({ error });
  }
};
