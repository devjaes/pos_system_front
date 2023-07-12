import config from "../../../config/serverConfig";
import {
  IBankCoopAccountResponse,
  ICardResponse,
} from "../types/IPaymentMethods";
import IUserResponse, {
  TClientsResponse,
  TEnterpriseResponse,
  IUserRegister,
  IResetPasswordData,
  IUserUpdate,
  IResetPassword,
} from "../types/IUserResponses";
import { handlerRemove } from "./putImages";

export const fetchGetUser = async (userId: number) => {
  try {
    const response = await fetch(`${config.API_REST_BASE_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

    return userData;
  } catch (error) {
    console.log({ error });
  }
};

export const fetchUpdateUser = async (
  userId: number,
  updateData: IUserUpdate
) => {
  try {
    const response = await fetch(`${config.API_REST_BASE_URL}/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const pr = await response.json();
    console.log({ pr });

    if (!response.ok) {
      console.log("No se pudo actualizar el usuario.");
      return;
    }
    const data = await response.json();

    if (data) {
      console.log("Se actualizó el usuario.");
      return data;
    } else {
      console.log("No se pudo actualizar el usuario.");
      return;
    }
  } catch (error) {
    console.log({ error });
  }
};

export const fetchResetRequestPassword = async (
  resetPasswordData: IResetPasswordData
) => {
  try {
    console.log({ resetPasswordData });
    const response = await fetch(
      `${config.API_REST_BASE_URL}/user/resetpassword/request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetPasswordData),
      }
    );

    if (!response.ok) {
      console.log({ response });
      console.log("Los datos no son correctos.");
      return;
    }
    const data = await response.json();

    if (data.userId) {
      console.log("Se puede cambiar la contraseña.");
      return data.userId;
    } else {
      console.log("No se puede cambiar la contraseña.");
      return;
    }
  } catch (error) {
    console.log({ error });
  }
};

export const fetchResetPassword = async (
  id: number,
  newPassword: IResetPassword
) => {
  try {
    console.log({ newPassword });
    const response = await fetch(
      `${config.API_REST_BASE_URL}/user/resetpassword/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPassword),
      }
    );

    if (!response.ok) {
      console.log("No se pudo cambiar la contraseña.");
      return;
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log({ error });
  }
};

export const fetchUpdateClient = async (
  userId: number,
  updateClient: IUserUpdate
) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/client/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateClient),
      }
    );

    if (!response.ok) {
      console.log("Error al modificar el cliente.");
      return;
    }
    const data = await response.json();
    const clientData: TClientsResponse = data.user;

    if (!clientData) {
      console.log("No se pudo obtener el cliente modificado.");
      return;
    }

    return clientData;
  } catch (error) {
    console.log({ error });
  }
};

export const fetchUpdateCompany = async (
  userId: number,
  updateCompany: IUserUpdate
) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/company/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateCompany),
      }
    );

    if (!response.ok) {
      console.log("Error al modificar la compañía.");
      return;
    }
    const data = await response.json();
    const companyData: TEnterpriseResponse = data.user;

    if (!companyData) {
      console.log("No se pudo obtener la compañía modificada.");
      return;
    }

    return companyData;
  } catch (error) {
    console.log({ error });
  }
};

export const fetchClient = async (userId: number) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/client/${userId}`,
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
  } catch (error) {
    console.log({ error });
  }
};

export const fetchRegisterUser = async (user: IUserRegister) => {
  let res;
  try {
    const response = await fetch(`${config.API_REST_BASE_URL}/client`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    res = response;
    console.log(res);

    if (!response.ok) {
      console.log("Error en el registro, revise los datos.");
      return;
    }
    const data = await response.json();
    const userData: TClientsResponse = data.client;

    if (!userData) {
      console.log("Error en el registro");
      return;
    }

    return userData;
  } catch (error) {
    console.log(res);
  }
};

export const fetchAllClients = async () => {
  try {
    const response = await fetch(`${config.API_REST_BASE_URL}/client/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Error al obtener los clientes.");
      return;
    }
    const data = await response.json();
    const clientsData: TClientsResponse[] = data.clients;

    if (!clientsData) {
      console.log("No se pudo obtener los clientes.");
      return;
    }

    return clientsData;
  } catch (error) {
    console.log({ error });
  }
};

export const fetchClientByUserId = async (userId: number) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/client/user/${userId}`,
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
  } catch (error) {
    console.log({ error });
  }
};

export const fetchDeleteClient = async (userId: number) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/client/delete/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("Error al eliminar el cliente.");
      return;
    }
    const data = await response.json();

    const imgRemoveMsg = handlerRemove(userId.toString()).then((res) => {
      if (res) {
        console.log("Cliente eliminado.");
        return res;
      }
    });

    if (!imgRemoveMsg) {
      console.log("No se pudo eliminar la imagen.");
      return;
    }

    return data;
  } catch (error) {
    console.log({ error });
  }
};

export const fetchGetPreferedPaymentClient = async (clientId: number) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/client/preferedaccount/${clientId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 204) {
      console.log("El cliente no tiene metodo de pago preferido.");
      return;
    }

    if (response.status === 404) {
      console.log("No hay metodo de pago preferido.");
      return;
    }

    const data = await response.json();
    const accountData: ICardResponse | IBankCoopAccountResponse = data.account;

    if (!accountData) {
      console.log("No se pudo obtener el metodo de pago preferido.");
      return;
    }

    return accountData;
  } catch (error) {
    console.log({ error });
  }
};

export const fetchSetPreferedPaymentClient = async (
  clientId: number,
  paymentId: number,
  type: String
) => {
  try {
    console.log(clientId, paymentId, type);
    const response = await fetch(
      `${config.API_REST_BASE_URL}/client/preferedaccount/${clientId}/${paymentId}?type=${type}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("Error al actualizar el metodo de pago preferido.");
      const data = await response.json();
      console.log(data);
      return;
    }

    const data = await response.json();
    const accountData: ICardResponse | IBankCoopAccountResponse = data.account;

    if (!accountData) {
      console.log("No se pudo actualizar el metodo de pago preferido.");
      return;
    }

    return accountData;
  } catch (error) {
    console.log({ error });
  }
};

export const fetchCompany = async (userId: number) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/company/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
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
  } catch (error) {
    console.log({ error });
  }
};

export const fetchRegisterEnterprise = async (user: IUserRegister) => {
  try {
    const response = await fetch(`${config.API_REST_BASE_URL}/company`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    console.log("user", user, "\n", response);

    if (!response.ok) {
      console.log("Error en el registro.");
      return;
    }
    const data = await response.json();
    console.log(data);
    const userData: TEnterpriseResponse = data.company;

    if (!userData) {
      console.log("Error en el proceso de registro");
      return;
    }

    return userData;
  } catch (error) {
    console.log("Error en fetch", error);
  }
};

export const fetchAllCompanies = async () => {
  try {
    const response = await fetch(`${config.API_REST_BASE_URL}/company/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Error al obtener las companias.");
      return;
    }
    const data = await response.json();
    const companiesData: TEnterpriseResponse[] = data.companies;

    if (!companiesData) {
      console.log("No se pudo obtener las companias.");
      return;
    }

    return companiesData;
  } catch (error) {
    console.log({ error });
    return;
  }
};

export const fetchCompanyByUserId = async (userId: number) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/company/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("Error al obtener la compania");
      return;
    }
    const data = await response.json();
    const companyData: TEnterpriseResponse = data.company;

    if (!companyData) {
      console.log("No se pudo obtener la compania");
      return;
    }

    return companyData;
  } catch (error) {
    console.log({ error });
  }
};

export const fetchDeleteCompany = async (userId: number) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/company/delete/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("Error al eliminar la compania");
      return;
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log({ error });
  }
};

export const fetchGetPreferedPaymentCompany = async (companyId: number) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/company/preferedaccount/${companyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 204) {
      console.log("El cliente no tiene metodo de pago preferido.");
      return;
    }

    if (response.status === 404) {
      console.log("No hay metodo de pago preferido.");
      return;
    }

    const data = await response.json();
    const accountData: IBankCoopAccountResponse = data.account;

    if (!accountData) {
      console.log("No se pudo obtener el metodo de pago preferido.");
      return;
    }

    return accountData;
  } catch (error) {
    console.log({ error });
  }
};

export const fetchSetPreferedPaymentCompany = async (
  companyId: number,
  paymentId: number
) => {
  console.log("companyId", companyId, "paymentId", paymentId);
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/company/preferedaccount/${companyId}/${paymentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("Error al actualizar el metodo de pago preferido.");
      const data = await response.json();

      console.log("data", data);
      return;
    }

    const data = await response.json();
    console.log("data", data);
    const accountData: IBankCoopAccountResponse = data.account;

    if (!accountData) {
      console.log("No se pudo actualizar el metodo de pago preferido.");
      return;
    }

    return accountData;
  } catch (error) {
    console.log({ error });
  }
};

export default fetchGetUser;
