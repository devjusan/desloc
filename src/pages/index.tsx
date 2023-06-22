import Head from 'next/head';
import { PageContainer } from '../css/global';

export default function Clients() {
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
