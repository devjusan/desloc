import Item from '@/src/components/ui/item';
import { messages } from '@/src/config/messages/general';
import { PageContainer } from '@/src/css/global';
import useFetch from '@/src/hooks/useFetch';
import { toastService } from '@/src/services';
import { Driver } from '@/src/types/drivers';
import { CircularProgress } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Response {
  response: { drivers: Driver[] };
  isLoading: boolean;
  error: boolean;
}

const Drivers: FC = () => {
  const router = useRouter();
  const { response, isLoading, error } = (useFetch(
    'api/drivers'
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
        <title>Condutores | Deslocamento</title>
      </Head>
      <PageContainer styles={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>{response?.drivers.map(({ id, nome, numeroHabilitacao }, index) => {
          return (
            <Item
              key={id}
              cb={() => {
                router.push(`/drivers/${id}`);
              }}
              description={numeroHabilitacao}
              title={nome}
              index={index}
            />
          );
        })}</PageContainer>
    </>
  );
};

export default Drivers;
