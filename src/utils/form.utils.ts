import { displacementInputs } from '../helpers/formInputs';
import { Displacement } from '../types/displacements';

export const isDisplacement = (key: keyof Displacement) => {
  return key === 'inicioDeslocamento' || key === 'fimDeslocamento';
};

export const handleType = (key: keyof Displacement) => {
  const handler = isDisplacement(key);

  return handler ? 'date' : 'text';
};

export const orderedDisplacementInput = (): {
  uniq: Array<string>;
  list: Array<string>;
} => {
  const inputs = displacementInputs();

  return Object.entries(inputs).reduce(
    (acc, input) => {
      const [key] = input;
      const handler =
        key === 'idCliente' || key === 'idCondutor' || key === 'idVeiculo';

      if (handler) {
        acc.list.push(key);
      } else {
        acc.uniq.push(key);
      }

      return acc;
    },
    {
      uniq: [] as Array<string>,
      list: [] as Array<string>,
    }
  );
};
