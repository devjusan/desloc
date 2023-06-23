import Head from 'next/head';
import { FC } from 'react';
import { PageContainer } from '@/src/css/global';
import { useRouter } from 'next/router';
import useFetch from '@/src/hooks/useFetch';
import { CircularProgress } from '@mui/material';
import { toastService } from '@/src/services';
import { messages } from '@/src/config/messages/general';
import { Displacement } from '@/src/types/displacements';
import Item from '@/src/components/ui/item';

interface Response {
  response: { displacements: Displacement[] };
  isLoading: boolean;
  error: boolean;
}

const Displacements: FC = () => {
  const router = useRouter();
  const { response, isLoading, error } = (useFetch(
    'api/displacements'
  ) as unknown) as Response;

  if (error) {
    toastService.error(messages.error.default);
  }

  if (isLoading || error) {
    return (
      <PageContainer styles={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
        <CircularProgress />
      </PageContainer>
    );
  }

  return (
    <>
      <Head>
        <title>Deslocamentos | Deslocamento</title>
      </Head>
      <PageContainer styles={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>{response?.displacements.map(({ id, inicioDeslocamento, fimDeslocamento}, index) => {
          return (
            <Item
              key={id}
              cb={() => {
                router.push(`/displacements/${id}`);
              }}
              description={fimDeslocamento?.toString() ?? 'Não finalizado'}
              title={inicioDeslocamento?.toString() ?? 'Não iniciado'}
              index={index}
            />
          );
        })}</PageContainer>
    </>
  );
};

export default Displacements;
