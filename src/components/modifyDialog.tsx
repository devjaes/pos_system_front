import { IInputsForm } from "@/store/types/IForms";
import { IProductResponse } from "@/store/types/IProducts";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { KeyFilterType } from "primereact/keyfilter";
import { Toast } from "primereact/toast";
import React from "react";
import { Controller, useForm } from "react-hook-form";

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
        onChange: () => {},
      },
      {
        name: "mainCode",
        label: "Código Principal",
        keyfilter: "num",
        placeholder: "Código Principal",
        alertText: "*El código principal es obligatorio",
        value: product?.mainCode,
        onChange: () => {},
      },
      {
        name: "auxCode",
        label: "Código Auxiliar",
        keyfilter: "num",
        placeholder: "Código Auxiliar",
        alertText: "*El código auxiliar es obligatorio",
        value: product?.auxCode,
        onChange: () => {},
      },
      {
        name: "description",
        label: "Descripción",
        keyfilter: "alpha",
        placeholder: "Contraseña",
        alertText: "*La contraseña es obligatoria",
        value: product?.description,
        onChange: () => {},
      },
      {
        name: "stock",
        label: "Stock",
        keyfilter: "num",
        placeholder: "Stock",
        alertText: "*El stock es obligatorio",
        value: product?.stock as unknown as string,
        onChange: () => {},
      },
      {
        name: "unitPrice",
        label: "Precio Unitario",
        keyfilter: "money",
        placeholder: "Precio Unitario",
        alertText: "*El precio unitario es obligatorio",
        value: product?.unitPrice as unknown as string,
        onChange: () => {},
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

  const renderDialogContent = (product: IProductResponse) => {
    return (
      <form>
        {productInfo.map((product, index) => (
          <div className="py-4 block" key={index}>
            <span className="p-float-label">
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
