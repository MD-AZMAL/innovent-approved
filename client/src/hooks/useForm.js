import { useState } from "react";

const useForm = (initialState) => {
  const [value, setValue] = useState(initialState);
  const [formError, setFormError] = useState({});
  const [formMessage, setFormMessage] = useState("");

  const handleChange = (e) => {
    e.persist();
    setValue((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleError = (name, message) => {
    setFormError((state) => ({ ...state, [name]: message }));
  };

  const clearInput = () => {
    setValue(initialState);
  };

  const clearError = () => {
    setFormError({});
  };

  return [
    value,
    handleChange,
    formError,
    handleError,
    clearInput,
    clearError,
    formMessage,
    setFormMessage,
  ];
};

export default useForm;
