import { fetchWrapper } from '../helpers/fetchWrapper';
import { Vehicle } from '../types/vehicles';

const getVehicleById = async (id: string): Promise<Vehicle> => {
  const response: Promise<Vehicle> = await fetchWrapper.get(`Veiculo/${id}`);

  return response;
};

const deleteVehicle = async (id: string): Promise<void> => {
  await fetchWrapper.del(`Veiculo/${id}`, {
    body: JSON.stringify({ id }),
  });
};

const createVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
  const response: Promise<Vehicle> = await fetchWrapper.post(
    `Veiculo`,
    vehicle
  );

  return response;
};

const updateVehicle = async (
  vehicle: Vehicle,
  id: string
): Promise<Response | undefined> => {
  const response = await fetchWrapper.put(`Veiculo/${id}`, vehicle);

  return response;
};

const actions = {
  getVehicleById,
  deleteVehicle,
  createVehicle,
  updateVehicle,
};

export default actions;
