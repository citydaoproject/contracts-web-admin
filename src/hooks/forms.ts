import { ChangeEvent, useState } from 'react';

export type FormFieldTextChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

export interface FormFieldsHook<S> {
  fields: S;
  setFieldValue: (name: keyof S, value: any) => void;
  handleFieldChange: (event: FormFieldTextChangeEvent) => string;
  resetFields: () => void;
}

export const useFormFields = <S>(initialState: S): FormFieldsHook<S> => {
  const [fields, setValues] = useState<S>(initialState);

  const setFieldValue = (name: keyof S, value: any) => {
    setValues({
      ...fields,
      [name]: value,
    });
  };

  const handleFieldChange = (event: FormFieldTextChangeEvent) => {
    const { name, value } = event.target;
    setFieldValue(name as keyof S, value);
    return value;
  };

  const resetFields = () => {
    setValues(initialState);
  };

  return { fields, handleFieldChange, setFieldValue, resetFields };
};
