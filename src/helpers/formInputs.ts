import { Client } from '../types/clients';
import { Driver } from '../types/drivers';

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

export const driverInputs = (): Driver => {
  return {
    catergoriaHabilitacao: '',
    nome: '',
    numeroHabilitacao: '',
    vencimentoHabilitacao: new Date(),
  } as Driver;
};
