import { fetchWrapper } from '../helpers/fetchWrapper';
import { Displacement } from '../types/displacements';

const getDisplacementById = async (id: string): Promise<Displacement> => {
  const response: Promise<Displacement> = await fetchWrapper.get(
    `Deslocamento/${id}`
  );

  return response;
};

const deleteDisplacement = async (id: string): Promise<void> => {
  await fetchWrapper.del(`Deslocamento/${id}`, {
    body: JSON.stringify({ id }),
  });
};

const createDisplacement = async (
  displacement: Displacement
): Promise<Displacement> => {
  const response: Promise<Displacement> = await fetchWrapper.post(
    `Deslocamento`,
    displacement
  );

  return response;
};

const updateDisplacement = async (
  displacement: Displacement,
  id: string
): Promise<Response | undefined> => {
  const response = await fetchWrapper.put(`Deslocamento/${id}`, displacement);

  return response;
};

const actions = {
  getDisplacementById,
  deleteDisplacement,
  createDisplacement,
  updateDisplacement,
};

export default actions;
