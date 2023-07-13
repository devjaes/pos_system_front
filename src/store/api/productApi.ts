import config from "../../../config/serverConfig";
import { IProductResponse, IProductUpdate } from "../types/IProducts";

export const handleGetProduct = async (productId: number) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/products/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("No se encontro el producto.");
      return;
    }
    const data = await response.json();
    const productData: IProductResponse = data;

    if (!productData) {
      console.log("Error al obtener el producto.");
      return;
    }

    return productData;
  } catch (error) {
    console.log({ error });
  }
};

export const handleGetAllProducts = async () => {
  try {
    const response = await fetch(`${config.API_REST_BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("No se pudo obtener los productos.");
      return;
    }
    const data = await response.json();
    const productsData: IProductResponse[] = data;

    if (!productsData) {
      console.log("Error al obtener los productos.");
      return;
    }

    return productsData;
  } catch (error) {
    console.log({ error });
  }
};

export const handleCreateProduct = async (product: IProductUpdate) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/products/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );

    if (!response.ok) {
      console.log("No se pudo crear el producto.");
      return;
    }
    const data = await response.json();
    const productData: IProductResponse = data;

    if (!productData) {
      console.log("Error al crear el producto.");
      return;
    }

    return productData;
  } catch (error) {
    console.log({ error });
  }
};

export const handleUpdateProduct = async (
  productId: number,
  product: IProductUpdate
) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );

    if (!response.ok) {
      console.log("No se pudo actualizar el producto.");
      return;
    }
    const data = await response.json();
    const productData: IProductResponse = data;

    if (!productData) {
      console.log("Error al actualizar el producto.");
      return;
    }

    return productData;
  } catch (error) {
    console.log({ error });
  }
};

export const handleDeleteProduct = async (productId: number) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("No se pudo eliminar el producto.");
      return;
    }
    const data = await response.json();

    if (!data) {
      console.log("Error al eliminar el producto.");
      return;
    }

    return data;
  } catch (error) {
    console.log({ error });
  }
};
