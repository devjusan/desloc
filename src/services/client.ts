import { fetchWrapper } from '../helpers/fetchWrapper';
import { Client } from '../types/clients';

const getClientById = async (id: string): Promise<Client> => {
  const response: Promise<Client> = await fetchWrapper.get(`Cliente/${id}`);

  return response;
};

const deleteClient = async (id: string): Promise<void> => {
  await fetchWrapper.del(`Cliente/${id}`);
};

const createClient = async (client: Client): Promise<Client> => {
  const response: Promise<Client> = await fetchWrapper.post(`Cliente`, client);

  return response;
};

const updateClient = async (
  client: Client,
  id: string
): Promise<Response | undefined> => {
  const response = await fetchWrapper.put(`Cliente/${id}`, client);

  return response;
};

const actions = {
  getClientById,
  deleteClient,
  createClient,
  updateClient,
};

export default actions;
