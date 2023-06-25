import { fetchWrapper } from '../helpers/fetchWrapper';
import { Driver } from '../types/drivers';

const getDriverById = async (id: string): Promise<Driver> => {
  const response: Promise<Driver> = await fetchWrapper.get(`Condutor/${id}`);

  return response;
};

const deleteDriver = async (id: string): Promise<void> => {
  await fetchWrapper.del(`Condutor/${id}`, { body: JSON.stringify({ id }) });
};

const createDriver = async (driver: Driver): Promise<Driver> => {
  const response: Promise<Driver> = await fetchWrapper.post(`Condutor`, driver);

  return response;
};

const updateDriver = async (
  driver: Driver,
  id: string
): Promise<Response | undefined> => {
  const response = await fetchWrapper.put(`Condutor/${id}`, driver);

  return response;
};

const actions = {
  getDriverById,
  deleteDriver,
  createDriver,
  updateDriver,
};

export default actions;
