import Item from '@/src/components/ui/item';
import { messages } from '@/src/config/messages/general';
import { PageContainer } from '@/src/css/global';
import useFetch from '@/src/hooks/useFetch';
import { toastService } from '@/src/services';
import { Vehicle } from '@/src/types/vehicles';
import { CircularProgress } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Response {
  response: { vehicles: Vehicle[] };
  isLoading: boolean;
  error: boolean;
}

const Vehicles: FC = () => {
  const router = useRouter();
  const { response, isLoading, error } = (useFetch(
    'api/vehicles'
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
        <title>Veículos | Deslocamento</title>
      </Head>
      <PageContainer styles={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
        {response?.vehicles.map(({ id,placa, marcaModelo }, index) => {
          return (
            <Item
              key={id}
              cb={() => {
                router.push(`/vehicles/${id}`);
              }}
              description={marcaModelo}
              title={placa}
              index={index}
            />
          );
        })}
      </PageContainer>
    </>
  );
};

export default Vehicles;
