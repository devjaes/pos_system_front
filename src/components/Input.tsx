

export interface IInputsForm {
  name: string;
  label: string;
  alertText?: string;
  type: string;
  placeholder?: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
  value?: string;
}

export const InputForm = ({ allForm }: { allForm: IInputsForm[] }) => {
  return (
    <div className=" gap-4">
      {allForm.map((input, index) => {
        return (
          <div className="pb-4 block" key={index}>
            <label className="block pb-2 ">
              {input.label}
              {input.alertText && (
                <span className="text-red-500 text-sm"> {input.alertText}</span>
              )}
            </label>
            <input
              className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
              type={input.type}
              placeholder={input.placeholder}
              onChange={input.onChange}
              value={input.value}
              disabled={input.disabled}
            />
          </div>
        );
      })}
    </div>
  );
};

export default InputForm;
