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

export const driverFormSchema = (): Array<IFormSchema> => {
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
      name: 'numeroHabilitacao',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'vencimentoHabilitacao',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'catergoriaHabilitacao',
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

export const vehicleFormSchema = (): Array<IFormSchema> => {
  return [
    {
      name: 'placa',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'marcaModelo',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'anoFabricacao',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'kmAtual',
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

export const displacementFormSchema = (): Array<IFormSchema> => {
  return [
    {
      name: 'kmInicial',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'kmFinal',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'inicioDeslocamento',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'fimDeslocamento',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'checkList',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'motivo',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'observacao',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'idCondutor',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'idVeiculo',
      errorsList: [
        {
          hasError: false,
          message: 'Campo obrigatório',
          regex: (value) => !!value,
        },
      ],
    },
    {
      name: 'idCliente',
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
