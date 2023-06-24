import { PageContainer } from '@/src/css/global';
import { displacementService } from '@/src/services';
import { Displacement } from '@/src/types/displacements';
import { formatDate } from '@/src/utils/formatter.utils';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

const FCDisplacements: FC<{ displacement: Displacement }> = ({
  displacement: {
    observacao,
    checkList,
    fimDeslocamento,
    inicioDeslocamento,
    kmFinal,
    kmInicial,
    motivo,
  },
}) => {
  return (
    <PageContainer
      styles={{ flexDirection: 'column', gap: '2rem', alignItems: 'center' }}
    >
      <h1>{observacao}</h1>
      <p>{checkList}</p>
      <p>{formatDate(fimDeslocamento?.toString())}</p>
      <p>{formatDate(inicioDeslocamento?.toString())}</p>
      <p>{kmFinal}</p>
      <p>{kmInicial}</p>
      <p>{motivo}</p>
    </PageContainer>
  );
};

export default FCDisplacements;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const displacement = await displacementService.getDisplacementById(
    ctx.params?.slug as string
  );

  return {
    props: { displacement },
  };
};
