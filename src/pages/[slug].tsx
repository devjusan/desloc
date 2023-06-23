import { PageContainer } from '@/src/css/global';
import { clientService, } from '@/src/services';
import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { Client } from '../types/clients';

const FCClient: FC<{client: Client}> = ({client: {bairro, cidade, logradouro, numero, nome, numeroDocumento, tipoDocumento, uf}}) => {
  return <PageContainer styles={{flexDirection: 'column', gap: '2rem', alignItems: 'center'}}>
    <h1>{nome}</h1>
    <h2>{tipoDocumento}: {numeroDocumento}</h2>
    <h2>{logradouro}, {numero}</h2>
    <h2>{bairro}, {cidade} - {uf}</h2>
  </PageContainer>;
};

export default FCClient;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = await clientService.getClientById(ctx.params?.slug as string)
  
  return {
    props: { client }
  };
};
