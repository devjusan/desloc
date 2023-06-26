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
    idCliente,
    idCondutor,
    idVeiculo,
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
      <p>km inicial: {kmInicial}</p>
      <p>km final: {kmFinal}</p>
      <p>Motivo: {motivo}</p>
      <p>ID do Cliente: {idCliente}</p>
      <p>ID do Condutor: {idCondutor}</p>
      <p>ID do Veículo: {idVeiculo}</p>
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
