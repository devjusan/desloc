import { Client } from '../types/clients';
import { Displacement } from '../types/displacements';
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

export const displacementInputs = (): Displacement => {
  return {
    checkList: '',
    fimDeslocamento: new Date(),
    inicioDeslocamento: new Date(),
    motivo: '',
    idCliente: 0,
    idCondutor: 0,
    kmFinal: 0,
    kmInicial: 0,
    observacao: '',
    idVeiculo: 0,
  } as Displacement;
};
