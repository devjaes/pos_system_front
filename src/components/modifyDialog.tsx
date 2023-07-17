import { IInputsForm } from "@/store/types/IForms";
import { IProductResponse } from "@/store/types/IProducts";
import { ICE, IRBPNR, IVAS } from "@/store/types/Tables";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { KeyFilterType } from "primereact/keyfilter";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import ComboBox from "./ComboBox";

interface Props {
  product: IProductResponse;
  onHide: () => void;
  visible: boolean;
  setEditVisible: (value: boolean) => void;
}

export default function ModifyDialog({
  product,
  onHide,
  visible,
  setEditVisible,
}: Props) {
  const [selectedIVA, setSelectedIVA] = React.useState<any>(product?.ivaType);
  const [selectedICE, setSelectedICE] = React.useState<any>(product?.iceType);
  const [selectedIRBP, setSelectedIRBP] = React.useState<any>(product?.irbpType);
  const [productInfo, setProductInfo] = React.useState<IInputsForm[]>([]);


  const toast = React.useRef<Toast>(null);

  React.useEffect(() => {
    if (product !== undefined) {
      createProductInfo(product);
    }
  }, [product]);

  const createProductInfo = (product: IProductResponse) => {
    const productInfo: IInputsForm[] = [
      {
        name: "name",
        label: "Nombre",
        keyfilter: "alpha",
        placeholder: "Nombre del Producto",
        alertText: "*El nombre es obligatorio",
        value: product?.name,
        onChange: () => { },
        type: "InputText"

      },
      {
        name: "mainCode",
        label: "Código Principal",
        keyfilter: "num",
        placeholder: "Código Principal",
        alertText: "*El código principal es obligatorio",
        value: product?.mainCode,
        onChange: () => { },
        type: "InputText"
      },
      {
        name: "auxCode",
        label: "Código Auxiliar",
        keyfilter: "num",
        placeholder: "Código Auxiliar",
        alertText: "*El código auxiliar es obligatorio",
        value: product?.auxCode,
        onChange: () => { },
        type: "InputText"
      },
      {
        name: "description",
        label: "Descripción",
        keyfilter: "alpha",
        placeholder: "Contraseña",
        alertText: "*La contraseña es obligatoria",
        value: product?.description,
        onChange: () => { },
        type: "InputText"
      },
      {
        name: "stock",
        label: "Stock",
        keyfilter: "num",
        placeholder: "Stock",
        alertText: "*El stock es obligatorio",
        value: product?.stock as unknown as string,
        onChange: () => { },
        type: "InputText"
      },
      {
        name: "unitPrice",
        label: "Precio Unitario",
        keyfilter: "money",
        placeholder: "Precio Unitario",
        alertText: "*El precio unitario es obligatorio",
        value: product?.unitPrice as unknown as string,
        onChange: () => { },
        type: "InputText"
      },

    ];
    setProductInfo(productInfo);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data: any) => {
    toast.current?.show({
      severity: "success",
      summary: "Confirmed",
      detail: "Product Updated",
      life: 3000,
    });
    console.log(data);
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productInfo"
  })



  const renderDialogContent = (product: IProductResponse) => {
    return (
      <form>
        {productInfo.map((product, index) => (
          <div className="py-4 block" key={index}>
            <span className="p-float-label">
              <Toast ref={toast} />
              <Controller
                name={product.name}
                control={control}
                rules={{ required: true }}
                defaultValue={product.value}
                render={({ field }) => (
                  <>
                    <InputText
                      {...field}
                      className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
                      keyfilter={product.keyfilter as KeyFilterType}
                      placeholder={product.placeholder}
                    />
                    {errors[product.name] && (
                      <small className="text-red-500">
                        {product.alertText}
                      </small>
                    )}
                  </>
                )}
                shouldUnregister
              />
              <label className="block pb-2" htmlFor={product.name}>
                {product.label}
              </label>
            </span>
          </div>

        ))}

        <div className="flex justify-evenly gap-4">
          <div className="card flex justify-content-center py-4 w-full">
            <ComboBox label="ICE" options={ICE} defaultValue={product.iceType ? product.iceType : "No aplica"} onChange={() => { }}></ComboBox>
          </div>
          <div className="card flex justify-content-center py-4 w-full">
            <ComboBox label="IRBP" options={IRBPNR} defaultValue={product.irbpType ? product.irbpType : "No aplica"} onChange={() => { }}></ComboBox>
          </div>
          <div className="card flex justify-content-center py-4 w-full">
            <ComboBox label="IVA" options={IVAS} initialValue={selectedIVA} onChange={() => { }}></ComboBox>
          </div>
        </div>


        <div className="flex justify-center">
          <Button
            icon="pi pi-check"
            className="p-button-success p-mr-2"
            label="Modificar"
            onClick={onSubmit}
          />
        </div>
      </form>
    );
  };

  return (
    <>
      <Dialog
        header={"Modificar " + `${product?.name}`}
        headerClassName="text-center text-3xl font-bold"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          setEditVisible(false);
        }}
        modal={true}
      >
        {renderDialogContent(product)}
      </Dialog>
    </>
  );
}