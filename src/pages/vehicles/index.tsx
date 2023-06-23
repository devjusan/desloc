import { PageContainer } from '@/src/css/global';
import Head from 'next/head';
import { FC } from 'react';

const Vehicles: FC = () => {
  return (
    <>
      <Head>
        <title>Veículos | Deslocamento</title>
      </Head>
      <PageContainer>Veículos</PageContainer>
    </>
  );
};

export default Vehicles;
