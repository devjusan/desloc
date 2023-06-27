import DisplacementOptionsList from '@/src/components/ui/displacement-options-list';
import Input from '@/src/components/ui/input';
import { messages } from '@/src/config/messages/general';
import { PAGE_MESSAGES } from '@/src/config/messages/pages';
import { PageContainer } from '@/src/css/global';
import useForm from '@/src/hooks/useForm';
import { displacementService, toastService } from '@/src/services';
import { Displacement } from '@/src/types/displacements';
import { displacementFormSchema } from '@/src/utils/form-schema.utils';
import { isDisplacement, uniqDisplacementInput } from '@/src/utils/form.utils';
import { formatDate } from '@/src/utils/formatter.utils';
import { Button, CircularProgress } from '@mui/material';
import isEqual from 'lodash/isEqual';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { FC, SetStateAction, useState } from 'react';
import { mutate } from 'swr';

const DynamicDialog = dynamic(() => import('@/src/components/portals/dialog'), {
  loading: () => (
    <PageContainer styles={{ alignItems: 'center' }}>
      <CircularProgress />
    </PageContainer>
  ),
});

const FCDisplacements: FC<{ displacement: Displacement }> = ({
  displacement,
}) => {
  const { state, errors, isValid, onChange, setState, setInitialErrorsState } =
    useForm(displacementFormSchema(), displacement, false);

  const [open, setOpen] = useState(false);
  const formEntries = uniqDisplacementInput(state as unknown as Displacement);

  const onSubmit = async () => {
    try {
      const data = { ...displacement };

      if (isEqual(data, state)) {
        toastService.error(messages.displacements.equal);
        return;
      }

      await displacementService.updateDisplacement(
        state as unknown as Displacement,
        data.id?.toString() as string
      );

      setInitialErrorsState();
      setOpen(false);
      mutate('/api/displacements');
    } catch (error) {
      setInitialErrorsState();
      toastService.error(messages.error.default);
      setOpen(false);
    }
  };

  const onCancel = () => {
    setInitialErrorsState();
    setState(displacement as unknown as SetStateAction<Record<string, string>>);
  };

  return (
    <PageContainer
      styles={{ flexDirection: 'column', gap: '1rem', alignItems: 'center' }}
    >
      <DynamicDialog
        title={PAGE_MESSAGES.DISPLACEMENT.DIALOG.EDIT.TITLE(state.motivo)}
        description={PAGE_MESSAGES.DISPLACEMENT.DIALOG.EDIT.SUBTITLE}
        isOpen={open}
        setOpen={setOpen}
        cbOnSubscribe={onSubmit}
        cbOnCancel={onCancel}
        disableSubmitBtn={!isValid}
        Content={
          <>
            {formEntries.map(([key, value]) => (
              <Input
                key={key}
                id={key}
                disabled={key === 'id'}
                label={key}
                variant='standard'
                value={value}
                name={key}
                InputLabelProps={{
                  shrink: isDisplacement(key as keyof Displacement)
                    ? true
                    : undefined,
                }}
                error={errors[key]?.hasError}
                helperText={errors[key]?.message}
                onChange={onChange}
              />
            ))}
            <DisplacementOptionsList
              errors={errors}
              form={state as unknown as Displacement}
              onChange={onChange}
            />
          </>
        }
        Trigger={() => <Button variant='contained'>Editar deslocamento</Button>}
      />
      <h2>Início do deslocamento: {formatDate(state.inicioDeslocamento)}</h2>
      <h2>Final do deslocamento: {formatDate(state.fimDeslocamento)}</h2>
      <h2> kmInicial: {state.kmInicial} </h2>
      <h2> kmFinal: {state.kmFinal} </h2>
      <h2> CheckList: {state.checkList} </h2>
      <h2> Motivo: {state.motivo} </h2>
      <h2> Observação: {state.observacao} </h2>
      <h2> checkList: {state.checkList} </h2>
      <h2> ID do condutor: {state.idCondutor} </h2>
      <h2> ID do veículo: {state.idVeiculo} </h2>
      <h2> ID do cliente: {state.idCliente} </h2>
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
