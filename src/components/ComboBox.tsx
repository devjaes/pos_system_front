import { ICityResponse } from "@/store/types/ICitiesResponses";
import { IBankCoopAccountResponse } from "@/store/types/IPaymentMethods";

interface IComboOptions {
  label: string;
  options: string[];
  onChange: (selectedValue: string) => void;
  defaultValue?: string;
  disabled?: boolean;
}

const ComboBox = ({
  label = "",
  options = [],
  onChange = () => {},
  defaultValue = "",
  disabled = false,
}: IComboOptions): JSX.Element => {
  const OpcionesCombo = options.map((opcion, index) => (
    <option value={opcion} key={index} disabled={disabled}>
      {opcion}
    </option>
  ));

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <div>
      <select
        className="border border-solid border-gray-600  py-2 px-4 bg-gray-800  rounded-full w-full "
        onChange={handleOnChange}
      >
        {defaultValue && <option value="">{defaultValue}</option>}
        {OpcionesCombo}
      </select>
    </div>
  );
};

export function CityComboBox({
  label,
  arrayDeOpciones,
  onChange,
}: {
  label: string;
  arrayDeOpciones: ICityResponse[];
  onChange: (selectedValue: number) => void;
}) {
  const OpcionesCombo = arrayDeOpciones.map((opcion) => (
    <option value={opcion.name} key={opcion.id}>
      {opcion.name}
    </option>
  ));

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedCityId = arrayDeOpciones.find(
      (city) => city.name === selectedValue
    )?.id;
    onChange(selectedCityId as number);
  };

  return (
    <div>
      <label className="block pb-2">{label}</label>
      <select
        className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
        onChange={handleOnChange}
      >
        <option value="">Seleccione una ciudad</option>
        {OpcionesCombo}
      </select>
    </div>
  );
}

export function AccountsComboBox({
  label,
  arrayDeOpciones,
  onChange,
}: {
  label: string;
  arrayDeOpciones: IBankCoopAccountResponse[];
  onChange: (selectedValue: IBankCoopAccountResponse) => void;
}) {
  const OpcionesCombo = arrayDeOpciones.map((opcion) => (
    <option
      className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
      value={opcion.id}
      key={opcion.id}
    >
      {opcion.name + " - " + opcion.number}
    </option>
  ));

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    const selectedAccount = arrayDeOpciones.find(
      (account) => account.id == (selectedValue as unknown as number)
    );
    onChange(selectedAccount as IBankCoopAccountResponse);
  };

  return (
    <div>
      <label className="block pb-2">{label}</label>
      <select
        className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
        onChange={handleOnChange}
      >
        <option value="">Seleccione una cuenta</option>
        {OpcionesCombo}
      </select>
    </div>
  );
}

interface BankCoop {
  key: string;
  value: string;
}

export function BanksComboBox({
  label,
  arrayDeOpciones,
  onChange,
  disabled = false,
  defaultValue,
}: {
  label: string;
  arrayDeOpciones: BankCoop[];
  onChange: (selectedValue: string) => void;
  disabled?: boolean;
  defaultValue?: string;
}) {
  const OpcionesCombo = arrayDeOpciones.map((opcion) => (
    <option
      className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
      value={opcion.value}
      key={opcion.value}
      disabled={disabled}
    >
      {opcion.value}
    </option>
  ));

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <div>
      <label className="block pb-2">{label}</label>
      <select
        className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
        onChange={handleOnChange}
        defaultValue={defaultValue || "Test"}
      >
        {defaultValue == "Seleccione un banco" && (
          <option value="">{defaultValue}</option>
        )}
        {OpcionesCombo}
      </select>
    </div>
  );
}
export default ComboBox;
