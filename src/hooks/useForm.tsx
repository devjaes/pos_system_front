import { ChangeEvent, useState } from "react";

export const useForm = <T extends Object>(initialState: T[]) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (
    { target }: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = target;
    setForm((prevForm) => {
      const updatedForm = [...prevForm];
      updatedForm[index] = { ...updatedForm[index], [name]: value };
      return updatedForm;
    });
  };

  return {
    form,
    handleChange,
    ...form,
  };
};
