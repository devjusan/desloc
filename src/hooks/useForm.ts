import { ChangeEvent, useEffect, useState } from 'react';
import { IFormErrors, IFormSchema } from '../types/form';
import { keyMap } from '../utils/array.utils';

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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

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
        const hasError = regex.test(value);

        setErrors((prev) => ({ ...getPrev(prev, hasError, message) }));
      } else if (regex instanceof Function) {
        const hasError = !regex(value);

        setErrors((prev) => ({
          ...getPrev(prev, hasError, message),
        }));
      }
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };

  return {
    isValid,
    errors,
    onChange,
    state,
    setState,
  };
};

export default useForm;
