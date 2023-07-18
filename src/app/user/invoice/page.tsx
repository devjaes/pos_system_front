"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleGetAllProducts,
} from "@/store/api/productApi";
import { IProductCreate, IProductResponse } from "@/store/types/IProducts";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { IInputsForm } from "@/store/types/IForms";
import { KeyFilterType } from "primereact/keyfilter";
import { ICE, IRBPNR, IVAS, PAYMENTS } from "@/store/types/Tables";
import ModifyDialog from "@/components/modifyDialog";
import { Controller, useForm } from "react-hook-form";
import { Avatar } from "primereact/avatar";
import { Dropdown } from "primereact/dropdown";
import { ICustomerResponse } from "@/store/types/ICustomer";
import { handleGetAllCustomers } from "@/store/api/customerApi";
import CustomerTable from "@/components/customerTable";
import { InputNumber } from "primereact/inputnumber";

const invoicer = () => {
  const [product, setProduct] = useState<IProductResponse>();
  const [products, setProducts] = useState<IProductResponse[]>([]);
  const [productTable, setProductTable] = useState<IProductResponse[]>([]);
  const [customers, setCustomers] = useState<ICustomerResponse[]>([]);
  const [customer, setCustomer] = useState<ICustomerResponse>();
  const [addCustomer, setAddCustomer] = useState<boolean>(false);
  const [change, setChange] = useState<number>(0);
  const [customersDropdown, setCustomersDropdown] = useState<{}[]>([]);
  const [productsDropdown, setProductsDropdown] = useState<{}[]>([]);

  const PaymentTypesDropdown = PAYMENTS.map((payment) => {
    return {
      label: payment.name,
      value: payment,
    };
  });

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    getFieldState,
    watch,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetAllProducts().then((response) => {
      if (response) {
        setProducts(response);
        const productsDropdown = response.map((product) => {
          return {
            label: product.name + " " + product.mainCode,
            value: product,
          };
        });
        setProductsDropdown(productsDropdown);
      }
    });

    handleGetAllCustomers().then((response) => {
      if (response) {
        setCustomers(response);
        const customersDropdown = response.map((customer) => {
          return {
            label:
              customer.name +
              " " +
              customer.lastName +
              " " +
              customer.identification,
            value: customer,
          };
        });
        setCustomersDropdown(customersDropdown);
      }
    });
  }, []);

  useEffect(() => {
    const customersDropdown = customers.map((customer) => {
      return {
        label:
          customer.name +
          " " +
          customer.lastName +
          " " +
          customer.identification,
        value: customer,
      };
    });
    setCustomersDropdown(customersDropdown);
  }, [customers]);

  const columns = [
    { field: "delete", header: "Eliminar", align: "center", width: "10%" },
    { field: "name", header: "Producto", width: "20%" },
    { field: "description", header: "Descripción", width: "40%" },
    { field: "stock", header: "Stock", align: "center", width: "10%" },
    { field: "quantity", header: "Cantidad", align: "center", width: "10%" },
    {
      field: "unitPrice",
      header: "P. Unitario",
      align: "center",
      width: "10%",
    },
    { field: "total", header: "Total", align: "center", width: "10%" },
  ];

  const onSubmit = handleSubmit((data) => {
    console.log({ data });
    console.log(watch("quantity") as number);
    console.log(
      (products[0].unitPrice as number) * (watch("quantity") as number)
    );
  });

  return (
    <div className="flex flex-col w-11/12 ">
      <h1 className="w-full border border-opacity-5 bg-gray-800 text-lg">
        <Avatar icon="pi pi-plus" className="bg-gray-700 m-2" />
        <strong>Nuevo registro de una factura</strong>
      </h1>
      <form
        className="border p-4 border-opacity-5 bg-gray-700"
        onSubmit={onSubmit}
      >
        <div className="flex flex-row pb-4">
          <div className="flex flex-col w-6/12 pr-6">
            <label htmlFor="client">
              <strong>Cliente</strong>
            </label>
            <div className="flex flex-row">
              <Dropdown
                value={customer}
                options={customersDropdown}
                placeholder="Seleccione un cliente"
                filter
                className="w-full md:w-14rem"
                onChange={(e) => setCustomer(e.value)}
              />
              <Button
                className="p-button-success h-10 w-1/12"
                icon="pi pi-plus"
                type="button"
                onClick={() => setAddCustomer(true)}
              />
            </div>
            {errors["customer"] && (
              <small className="text-red-500">
                Debe seleccionar un cliente
              </small>
            )}
            {addCustomer && (
              <Dialog
                header="Agregar Cliente"
                visible={addCustomer}
                style={{ width: "50vw" }}
                onHide={() => setAddCustomer(false)}
              />
            )}
          </div>
          <div className="flex flex-col pr-6">
            <label htmlFor="cash">
              <strong>Efectivo Recibido</strong>
            </label>

            <InputNumber
              placeholder="Efectivo Recibido"
              mode="currency"
              currency="USD"
              locale="en-US"
              showButtons
              minFractionDigits={2}
              maxFractionDigits={2}
              min={0.0}
              max={500.0}
              onValueChange={(e) => {
                setValue("receivedCash", e.value);
              }}
            />
          </div>
          <div className="flex flex-col w-2/12 pr-6">
            <label htmlFor="cash">
              <strong>Cambio</strong>
            </label>
            <div className="flex bg-jair-black  w-full h-full rounded-sm justify-center items-center">
              <label className="justify-center">
                <strong>{change}</strong>
              </label>
            </div>
          </div>
        </div>
        {customer && (
          <div className="flex flex-col py-8 px-4 border border-opacity-5 rounded-sm">
            <div className="flex flex-col w-full px-3     ">
              <label htmlFor="client" className="pb-2">
                <strong>Agregar Producto:</strong>
              </label>
              <Dropdown
                onChange={(e) => setProductTable([...productTable, e.value])}
                options={productsDropdown}
                placeholder="Seleccione un producto"
                filter
                className="w-full md:w-14rem"
              />
            </div>
            <div className="flex flex-col w-full py-6 px-3">
              <DataTable
                value={productTable}
                className="p-datatable-sm"
                scrollable
                scrollHeight="1000px"
                showGridlines
                stripedRows
                height={1000}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                rowClassName={(...rowData) => {
                  return "bg-gray-800";
                }}
              >
                {columns.map((column) => {
                  if (column.field === "delete") {
                    return (
                      <Column
                        className="w-1.5"
                        align={"center"}
                        alignHeader={"center"}
                        key={column.field}
                        field={column.field}
                        header={column.header}
                        body={(rowData) => {
                          return (
                            <Button
                              className="p-button-danger"
                              icon="pi pi-trash"
                              onClick={() => handleDeleteProduct(rowData)}
                            />
                          );
                        }}
                      />
                    );
                  } else if (column.field === "quantity") {
                    return (
                      <Column
                        alignHeader={"center"}
                        align={"center"}
                        key={column.field}
                        field={column.field}
                        header={column.header}
                        style={{ width: column.width }}
                        body={(rowData) => {
                          return (
                            <Controller
                              name={rowData.id + "quantity"}
                              control={control}
                              rules={{ required: true }}
                              defaultValue={1}
                              render={({ field }) => (
                                <InputNumber
                                  {...field}
                                  inputClassName="w-20"
                                  defaultValue={1}
                                  showButtons
                                  max={rowData.stock}
                                  min={1}
                                  onValueChange={(e) => {
                                    setValue(rowData.id + "quantity", e.value);
                                  }}
                                />
                              )}
                            />
                          );
                        }}
                      />
                    );
                  } else if (column.field === "total") {
                    return (
                      <Column
                        align={column.align as any}
                        key={column.field}
                        field={column.field}
                        header={column.header}
                        bodyStyle={{ width: column.width }}
                        body={(rowData) => {
                          return (
                            <label className="text-lg font-bold">
                              {(
                                (rowData.unitPrice as number) *
                                (watch(rowData.id + "quantity") as number)
                              ).toFixed(2)}
                            </label>
                          );
                        }}
                      />
                    );
                  } else {
                    return (
                      <Column
                        align={column.align as any}
                        key={column.field}
                        field={column.field}
                        header={column.header}
                        bodyStyle={{ width: column.width }}
                      />
                    );
                  }
                })}
              </DataTable>
              <div className="flex flex-row justify-end pt-4">
                <div className="justify-between pt-4">
                  <div className="flex flex-row justify-between">
                    <p className="text-lg font-bold">SUBTOTAL: </p>
                    <label className="text-lg font-bold pl-4">0.00</label>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-lg font-bold">DESCUENTO: </p>
                    <label className="text-lg font-bold pl-4">0.00</label>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-lg font-bold">IVA: </p>
                    <label className="text-lg font-bold pl-4">0.00</label>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-lg font-bold">VALOR DEL IVA: </p>
                    <label className="text-lg font-bold pl-4">0.00</label>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-lg font-bold">TOTAL: </p>
                    <label className="text-lg font-bold pl-4">0.00</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Button
          className="p-button-success p-mt-4"
          label="Guardar"
          type="submit"
          onSubmit={onSubmit}
        />
      </form>
      <Dialog
        header="Agregar Cliente"
        visible={addCustomer}
        style={{ width: "60vw" }}
        onHide={() => setAddCustomer(false)}
      >
        <CustomerTable setCustomersContext={setCustomers} />
      </Dialog>
    </div>
  );
};

export default invoicer;
