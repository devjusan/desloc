import { PageContainer } from '@/src/css/global';
import { vehicleService } from '@/src/services';
import { Vehicle } from '@/src/types/vehicles';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

const FCVehicle: FC<{vehicle: Vehicle}> = ({vehicle: {marcaModelo, anoFabricacao, kmAtual, placa}}) => {
  return <PageContainer styles={{flexDirection: 'column', gap: '2rem', alignItems: 'center'}}>
    <h1>{placa}</h1>
    <p>{marcaModelo}</p>
    <p>{anoFabricacao}</p>
    <p>{kmAtual}</p>
  </PageContainer>;
};

export default FCVehicle;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const vehicle = await vehicleService.getVehicleById(ctx.params?.slug as string)
  
  return {
    props: { vehicle }
  };
};
