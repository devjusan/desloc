import useFetch from '@/src/hooks/useFetch';
import { Client } from '@/src/types/clients';
import { Displacement } from '@/src/types/displacements';
import { Driver } from '@/src/types/drivers';
import { Vehicle } from '@/src/types/vehicles';
import { orderedDisplacementInput } from '@/src/utils/form.utils';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { ChangeEvent, FC } from 'react';

interface IDisplacementOptionsList {
  form: Displacement;
  onChange: (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>,
    key: keyof Displacement
  ) => void;
}

const DisplacementOptionsList: FC<IDisplacementOptionsList> = ({
  form,
  onChange,
}) => {
  const clients = useFetch('api/clients') as unknown as {
    response: { clients: Client[] };
  };
  const drivers = useFetch('api/drivers') as unknown as {
    response: { drivers: Driver[] };
  };
  const vehicles = useFetch('api/vehicles') as unknown as {
    response: { vehicles: Vehicle[] };
  };

  const { list } = orderedDisplacementInput();
  const listMap = (type: 'idCliente' | 'idCondutor' | 'idVeiculo') => {
    const map = {
      idCliente: clients?.response?.clients,
      idCondutor: drivers?.response?.drivers,
      idVeiculo: vehicles?.response?.vehicles,
    };

    return map[type];
  };

  const handleValue = (key: keyof Displacement) => {
    return form[key] ? form[key] : '';
  };

  return (
    <>
      {list.map((key) => (
        <FormControl variant='standard' fullWidth key={key}>
          <InputLabel variant='standard' id={key}>
            {' '}
            {key}{' '}
          </InputLabel>
          <Select
            variant='standard'
            labelId={key}
            label={key}
            aria-label='select'
            onChange={(e) => onChange(e, key as keyof Displacement)}
            value={handleValue(key as keyof Displacement)}
          >
            {listMap(key as 'idCliente' | 'idCondutor' | 'idVeiculo')?.map(
              ({ id }) => (
                <MenuItem value={id} key={id}>
                  {' '}
                  {id}{' '}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      ))}
    </>
  );
};

export default DisplacementOptionsList;
