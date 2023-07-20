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

export const handleCreateProduct = async (
  product: IProductUpdate,
  image: any
) => {
  const formData = new FormData();

  formData.append("product", JSON.stringify(product));

  if (image) {
    formData.append("image", image);
  }

  const entries = JSON.parse(JSON.stringify(formData));
  console.log(
    { formData },
    { entries },
    formData.get("image"),
    formData.get("product"),
    { product }
  );

  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/products/register`,
      {
        method: "POST",
        body: formData,
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
  product: IProductUpdate,
  image: any
) => {
  const formData = new FormData();

  formData.append("product", JSON.stringify(product));

  if (image) {
    formData.append("image", image);
  }

  const entries = JSON.parse(JSON.stringify(formData));
  console.log({ entries });

  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/products/${productId}`,
      {
        method: "PUT",
        body: formData,
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
