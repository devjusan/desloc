import { ChangeEvent, useEffect, useState } from 'react';
import { IFormErrors, IFormSchema } from '../types/form';
import { keyMap } from '../utils/array.utils';
import { SelectChangeEvent } from '@mui/material';

const useForm = <T>(
  schema: Array<IFormSchema>,
  initialState?: T,
  hasInitialErrors = true
) => {
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<Record<string, IFormErrors>>(
    hasInitialErrors
      ? (keyMap(schema, (item) => item.name) as unknown as Record<
          string,
          IFormErrors
        >)
      : {}
  );
  const [state, setState] = useState<Record<string, string>>(
    initialState || {}
  );

  const keys = keyMap(schema, (item) => item.name);

  useEffect(() => {
    setIsValid(Object.keys(errors).length === 0);
  }, [errors]);

  useEffect(() => {
    setIsValid(false);
  }, []);

  const onChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | number | Date | null>
  ) => {
    const { name, value } = e.target;
    console.log(value);

    const { errorsList } = keys[String(name)];

    const getPrev = (
      prev: Record<string, IFormErrors>,
      hasError: boolean,
      message?: string
    ) => {
      const initialValue = { ...prev };

      if (!hasError) {
        const { [name]: _, ...rest } = initialValue;

        return rest;
      }

      return {
        ...prev,
        [name]: {
          ...prev[String(name)],
          message,
          hasError,
        },
      };
    };

    for (let index = 0; index < errorsList.length; index += 1) {
      const { regex, message } = errorsList[Number(index)];

      if (regex instanceof RegExp) {
        const handleValue = value?.toString() || '';
        const hasError = regex.test(handleValue);

        setErrors((prev) => ({ ...getPrev(prev, hasError, message) }));
      } else if (regex instanceof Function) {
        const handleValue = value?.toString() || '';
        const hasError = !regex(handleValue);

        setErrors((prev) => ({
          ...getPrev(prev, hasError, message),
        }));
      }
    }
    const handleValue = value?.toString() || '';

    setState((prev) => ({ ...prev, [name]: handleValue }));
  };

  const setInitialErrorsState = () => {
    setErrors(
      keyMap(schema, (item) => item.name) as unknown as Record<
        string,
        IFormErrors
      >
    );
  };

  return {
    isValid,
    errors,
    onChange,
    state,
    setState,
    setInitialErrorsState,
  };
};

export default useForm;
