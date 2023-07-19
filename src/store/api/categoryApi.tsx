import { ICategoryResponse } from "../types/ICategory";
import config from "../../../config/serverConfig";

export const handleGetAllCategories = async () => {
    try {
        const response = await fetch(`${config.API_REST_BASE_URL}/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            console.log("No se pudo obtener las categorias.");
            return;
        }
        const data = await response.json();
        const categoriesData: ICategoryResponse[] = data;
        if (!categoriesData) {
            console.log("Error al obtener las categorias.");
            return;
        }
        return categoriesData;

    } catch (error) {
        console.log({ error });
    }
}