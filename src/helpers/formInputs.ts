import { Client } from '../types/clients';
import { Driver } from '../types/drivers';
import { Vehicle } from '../types/vehicles';

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

export const vehicleInputs = (): Vehicle => {
  return {
    anoFabricacao: 0,
    kmAtual: 0,
    marcaModelo: '',
    placa: '',
  } as Vehicle;
};
