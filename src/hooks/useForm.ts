import { useState } from "react";

export function useForm<T>(inputValues: T) {
  const [values, setValues] = useState(inputValues);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const {value, name} = e.target;
    setValues({...values, [name]: value});
  };

  return {values, handleChange, setValues}
};