import Head from 'next/head';
import { ChangeEvent, FC, useState } from 'react';
import { PageContainer } from '@/src/css/global';
import { useRouter } from 'next/router';
import useFetch from '@/src/hooks/useFetch';
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { displacementService, toastService } from '@/src/services';
import { messages } from '@/src/config/messages/general';
import { Displacement } from '@/src/types/displacements';
import Item from '@/src/components/ui/item';
import Input from '@/src/components/ui/input';
import Dialog from '@/src/components/portals/dialog';
import { PAGE_MESSAGES } from '@/src/config/messages/pages';
import { displacementInputs } from '@/src/helpers/formInputs';
import {
  handleType,
  isDisplacement,
  orderedDisplacementInput,
} from '@/src/utils/form.utils';
import { formatDate } from '@/src/utils/formatter.utils';
import { Client } from '@/src/types/clients';
import { Driver } from '@/src/types/drivers';
import { Vehicle } from '@/src/types/vehicles';

interface Response {
  response: { displacements: Displacement[] };
  isLoading: boolean;
  error: boolean;
  mutate: () => void;
}

const Displacements: FC = () => {
  const inputs = displacementInputs();
  const { uniq, list } = orderedDisplacementInput();
  const [form, setForm] = useState(Object.assign({}, inputs) as Displacement);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { response, isLoading, error, mutate } = useFetch(
    'api/displacements'
  ) as unknown as Response;

  const clients = useFetch('api/clients') as unknown as {
    response: { clients: Client[] };
  };
  const drivers = useFetch('api/drivers') as unknown as {
    response: { drivers: Driver[] };
  };
  const vehicles = useFetch('api/vehicles') as unknown as {
    response: { vehicles: Vehicle[] };
  };

  if (error) {
    toastService.error(messages.error.default);
  }

  if (isLoading || error) {
    return (
      <PageContainer
        styles={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <CircularProgress />
      </PageContainer>
    );
  }

  const onChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>,
    key: keyof Displacement
  ) => {
    e.preventDefault();

    setForm({ ...form, [key]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      await displacementService.createDisplacement(form);
      setOpen(false);

      mutate();
    } catch (error) {
      toastService.error(messages.error.default);
      setOpen(false);

      console.error(error);
    }
  };

  const onDelete = async () => {
    try {
      await displacementService.deleteDisplacement(
        response?.displacements[0]?.id?.toString() as string
      );
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const listMap = (type: 'idCliente' | 'idCondutor' | 'idVeiculo') => {
    const map = {
      idCliente: clients?.response?.clients,
      idCondutor: drivers?.response?.drivers,
      idVeiculo: vehicles?.response?.vehicles,
    };

    return map[type];
  };

  return (
    <>
      <Head>
        <title>Deslocamentos | Deslocamento</title>
      </Head>
      <PageContainer
        styles={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Dialog
          title={PAGE_MESSAGES.DISPLACEMENT.DIALOG.CREATE.TITLE}
          description={PAGE_MESSAGES.DISPLACEMENT.DIALOG.CREATE.SUBTITLE}
          isOpen={open}
          setOpen={setOpen}
          cbOnSubscribe={onSubmit}
          Content={
            <>
              {uniq.map((key) => (
                <Input
                  key={key}
                  id={key}
                  variant='standard'
                  aria-label={key}
                  InputLabelProps={{
                    shrink: isDisplacement(key as keyof Displacement)
                      ? true
                      : undefined,
                  }}
                  type={handleType(key as keyof Displacement)}
                  label={key}
                  onChange={(e) => onChange(e, key as keyof Displacement)}
                />
              ))}
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
                    value={form[key as keyof Displacement]}
                  >
                    {listMap(
                      key as 'idCliente' | 'idCondutor' | 'idVeiculo'
                    )?.map(({ id }) => (
                      <MenuItem value={id} key={id}>
                        {' '}
                        {id}{' '}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ))}
            </>
          }
          Trigger={() => (
            <Button
              sx={{
                my: '2rem',
              }}
              variant='contained'
            >
              Criar deslocamento
            </Button>
          )}
        />
        <>
          {response?.displacements.map(
            ({ id, inicioDeslocamento, fimDeslocamento }, index) => {
              return (
                <Item
                  key={id}
                  cb={() => {
                    router.push(`/displacements/${id}`);
                  }}
                  description={formatDate(inicioDeslocamento?.toString())}
                  title={formatDate(fimDeslocamento?.toString())}
                  cbOnDelete={onDelete}
                  index={index}
                />
              );
            }
          )}
        </>
      </PageContainer>
    </>
  );
};

export default Displacements;
