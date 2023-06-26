import Head from 'next/head';
import { PageContainer } from '../css/global';
import useFetch from '../hooks/useFetch';
import { clientService, toastService } from '../services';
import { Button, CircularProgress } from '@mui/material';
import { messages } from '../config/messages/general';
import Item from '../components/ui/item';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, useState } from 'react';
import { Client } from '../types/clients';
import Input from '../components/ui/input';
import Dialog from '../components/portals/dialog';
import { clientInputs } from '../helpers/formInputs';
import { PAGE_MESSAGES } from '../config/messages/pages';
import useForm from '../hooks/useForm';
import { clientFormSchema } from '../utils/form-schema.utils';

interface Response {
  response: { clients: Client[] };
  isLoading: boolean;
  error: boolean;
  mutate: () => void;
}

const Clients: FC = () => {
  const { state, errors, isValid, onChange } = useForm(
    clientFormSchema(),
    clientInputs()
  );
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { response, isLoading, error, mutate } = useFetch(
    'api/clients'
  ) as unknown as Response;
  const clientsEntries = Object.entries(state);

  if (error) {
    toastService.error(messages.error.default);
  }

  if (isLoading || error) {
    return (
      <PageContainer styles={{ alignItems: 'center' }}>
        <CircularProgress />
      </PageContainer>
    );
  }

  const onSubmit = async () => {
    try {
      await clientService.createClient(state as unknown as Client);

      setOpen(false);

      mutate();
    } catch (error) {
      toastService.error(messages.error.default);
      setOpen(false);
    }
  };

  const onDelete = async () => {
    try {
      await clientService.deleteClient(
        response?.clients[0]?.id?.toString() as string
      );

      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Deslocamento</title>
        <meta name='description' content='Aplicação para deslocamento' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageContainer
        styles={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Dialog
          title={PAGE_MESSAGES.CLIENT.DIALOG.CREATE.TITLE}
          description={PAGE_MESSAGES.CLIENT.DIALOG.CREATE.SUBTITLE}
          isOpen={open}
          setOpen={setOpen}
          cbOnSubscribe={onSubmit}
          disableSubmitBtn={!isValid}
          Content={
            <>
              {clientsEntries.map(([key]) => (
                <Input
                  key={key}
                  id={key}
                  label={key}
                  name={key}
                  error={errors[key]?.hasError}
                  helperText={errors[key]?.message}
                  variant='standard'
                  onChange={onChange}
                />
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
              Criar cliente
            </Button>
          )}
        />
        <>
          {response?.clients.map(({ id, nome, cidade }, index) => {
            return (
              <Item
                key={id}
                cb={() => {
                  router.push(`/${id}`);
                }}
                description={cidade}
                title={nome}
                cbOnDelete={onDelete}
                index={index}
              />
            );
          })}
        </>
      </PageContainer>
    </>
  );
};

export default Clients;
