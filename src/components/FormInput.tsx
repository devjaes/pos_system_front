"use client";
export interface IInputsForm {
  name?: string;
  label: string;
  type: string;
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  disabled?: boolean;
}

function InputFormularios({
  name = "",
  label = "Etiqueta",
  type = "text",
  value = "",
  placeholder = "",
  onChange = () => {},
  disabled = false,
}: IInputsForm) {
  if (!disabled) {
    return (
      <div className="pb-4">
        <label className="block pb-2"> {label}</label>
        <input
          className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
          type={type}
          placeholder={placeholder}
          defaultValue={value}
        />
      </div>
    );
  } else {
    return (
      <div className="pb-4">
        <label className="block pb-2"> {label}</label>
        <input
          className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          disabled
        />
      </div>
    );
  }
}

export default InputFormularios;
