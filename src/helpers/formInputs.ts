import { Client } from '../types/clients';

export const clientInputs = (): Client => {
  return {
    bairro: '',
    cidade: '',
    logradouro: '',
    numero: '',
    nome: '',
    numeroDocumento: '',
    tipoDocumento: '',
    uf: '',
  } as Client;
};
