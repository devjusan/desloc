import Dialog from '@/src/components/portals/dialog';
import DisplacementOptionsList from '@/src/components/ui/displacement-options-list';
import Input from '@/src/components/ui/input';
import { messages } from '@/src/config/messages/general';
import { PAGE_MESSAGES } from '@/src/config/messages/pages';
import { PageContainer } from '@/src/css/global';
import useForm from '@/src/hooks/useForm';
import { displacementService, toastService } from '@/src/services';
import { Displacement } from '@/src/types/displacements';
import { displacementFormSchema } from '@/src/utils/form-schema.utils';
import { handleType, isDisplacement } from '@/src/utils/form.utils';
import { formatDate } from '@/src/utils/formatter.utils';
import { Button } from '@mui/material';
import { isEqual } from 'lodash';
import { GetServerSideProps } from 'next';
import { FC, useState } from 'react';
import { mutate } from 'swr';

const FCDisplacements: FC<{ displacement: Displacement }> = ({
  displacement,
}) => {
  const { state, errors, isValid, onChange, setInitialErrorsState } = useForm(
    displacementFormSchema(),
    displacement,
    false
  );

  const [open, setOpen] = useState(false);
  const formEntries = Object.entries(state);

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

  return (
    <PageContainer
      styles={{ flexDirection: 'column', gap: '2rem', alignItems: 'center' }}
    >
      <Dialog
        title={PAGE_MESSAGES.DISPLACEMENT.DIALOG.EDIT.TITLE(state.nome)}
        description={PAGE_MESSAGES.DISPLACEMENT.DIALOG.EDIT.SUBTITLE}
        isOpen={open}
        setOpen={setOpen}
        cbOnSubscribe={onSubmit}
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
                type={handleType(key as keyof Displacement)}
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
      <h1>{state.placa}</h1>
      <h2> {state.marcaModelo} </h2>
      <h2> {formatDate(state.anoFabricacao.toString())} </h2>
      <h2> {state.numeroHabilitacao} </h2>
      <h2> {state.kmAtual} </h2>
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
