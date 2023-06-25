import { Displacement } from '../types/displacements';

export const isDisplacement = (key: keyof Displacement) => {
  return key === 'inicioDeslocamento' || key === 'fimDeslocamento';
};

export const handleType = (key: keyof Displacement) => {
  const handler = isDisplacement(key);

  return handler ? 'date' : 'text';
};
