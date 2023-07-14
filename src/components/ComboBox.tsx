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

export default ComboBox;
