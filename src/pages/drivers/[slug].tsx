import { PageContainer } from '@/src/css/global';
import { driversService } from '@/src/services';
import { Driver } from '@/src/types/drivers';
import { formatDate } from '@/src/utils/formatter.utils';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

const FCDriver: FC<{driver: Driver}> = ({driver: {
  catergoriaHabilitacao, nome, numeroHabilitacao, vencimentoHabilitacao
}}) => {
  return <PageContainer styles={{flexDirection: 'column', gap: '2rem', alignItems: 'center'}}>
    <h1>{nome}</h1>
    <p>{catergoriaHabilitacao}</p>
    <p>{numeroHabilitacao}</p>
    <p>{formatDate(vencimentoHabilitacao.toString())}</p>
  </PageContainer>;
};

export default FCDriver;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const driver = await driversService.getDriverById(ctx.params?.slug as string)
  
  return {
    props: { driver }
  };
};
