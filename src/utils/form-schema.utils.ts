import { IFormSchema } from '../types/form';

export const clientFormSchema = (): Array<IFormSchema> => {
  return [
    {
      name: 'nome',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'numeroDocumento',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'tipoDocumento',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'logradouro',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'numero',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'bairro',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'cidade',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'uf',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
  ];
};
