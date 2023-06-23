import Head from 'next/head';
import { PageContainer } from '../css/global';
import useFetch from '../hooks/useFetch';
import { toastService } from '../services';
import { CircularProgress } from '@mui/material';
import { messages } from '../config/messages/general';
import Item from '../components/ui/item';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Client } from '../types/clients';

interface Response {
  response: { clients: Client[] };
  isLoading: boolean;
  error: boolean;
}

const Clients: FC = () => {
  const router = useRouter();
  const { response, isLoading, error } = (useFetch(
    'api/clients'
  ) as unknown) as Response;

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

  return (
    <>
      <Head>
        <title>Deslocamento</title>
        <meta name='description' content='Aplicação para deslocamento' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageContainer styles={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>{response?.clients.map(({ id, nome, cidade }, index) => {
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
        })}</PageContainer>
    </>
  );
}

export default Clients;
