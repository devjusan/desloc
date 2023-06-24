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

interface Response {
  response: { clients: Client[] };
  isLoading: boolean;
  error: boolean;
}

const Clients: FC = () => {
  const inputs = clientInputs();
  const [form, setForm] = useState(Object.assign({}, inputs) as Client);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { response, isLoading, error } = useFetch(
    'api/clients'
  ) as unknown as Response;
  const clientsEntries = Object.entries(inputs);

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

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof Client
  ) => {
    e.preventDefault();

    setForm({ ...form, [key]: e.target.value });
  };

  const onSubmit = async () => {
    await clientService.createClient(form);
    setOpen(false);

    router.reload();
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
          title='Criar cliente'
          description='Preencha os campos abaixo para criar um novo cliente'
          isOpen={open}
          setOpen={setOpen}
          cbOnSubscribe={onSubmit}
          Content={
            <>
              {clientsEntries.map(([key]) => (
                <Input
                  key={key}
                  id={key}
                  label={key}
                  variant='standard'
                  onChange={(e) => onChange(e, key as keyof Client)}
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
