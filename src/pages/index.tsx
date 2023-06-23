import Head from 'next/head';
import { PageContainer } from '../css/global';
import useFetch from '../hooks/useFetch';
import { toastService } from '../services';
import { messages } from '../constants';
import { CircularProgress } from '@mui/material';

export default function Clients() {
  const { response, isLoading, error } = useFetch('api/clients');

  if (error) {
    toastService.error(messages.error.default);
  }

  if (isLoading || error) {
    return <CircularProgress />;
  }

  return (
    <>
      <Head>
        <title>Deslocamento</title>
        <meta name='description' content='Aplicação para deslocamento' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageContainer>Teste</PageContainer>
    </>
  );
}
