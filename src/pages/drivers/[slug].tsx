import Dialog from '@/src/components/portals/dialog';
import Input from '@/src/components/ui/input';
import { messages } from '@/src/config/messages/general';
import { PAGE_MESSAGES } from '@/src/config/messages/pages';
import { PageContainer } from '@/src/css/global';
import { driverInputs } from '@/src/helpers/formInputs';
import useForm from '@/src/hooks/useForm';
import { driversService, toastService } from '@/src/services';
import { Driver } from '@/src/types/drivers';
import { driverFormSchema } from '@/src/utils/form-schema.utils';
import { formatDate } from '@/src/utils/formatter.utils';
import { Button } from '@mui/material';
import { isEqual } from 'lodash';
import { GetServerSideProps } from 'next';
import { FC, useState } from 'react';
import { mutate } from 'swr';

const FCDriver: FC<{ driver: Driver }> = ({ driver }) => {
  const { state, errors, isValid, onChange, setInitialErrorsState } = useForm(
    driverFormSchema(),
    driver,
    false
  );

  const [open, setOpen] = useState(false);
  const formEntries = Object.entries(state);

  const onSubmit = async () => {
    try {
      const data = { ...driver };

      if (isEqual(data, state)) {
        toastService.error(messages.drivers.equal);
        return;
      }

      await driversService.updateDriver(
        state as unknown as Driver,
        data.id?.toString() as string
      );

      setInitialErrorsState();
      setOpen(false);
      mutate('/api/drivers');
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
        title={PAGE_MESSAGES.DRIVER.DIALOG.EDIT.TITLE(state.nome)}
        description={PAGE_MESSAGES.DRIVER.DIALOG.EDIT.SUBTITLE}
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
                error={errors[key]?.hasError}
                helperText={errors[key]?.message}
                onChange={onChange}
              />
            ))}
          </>
        }
        Trigger={() => <Button variant='contained'>Editar condutor</Button>}
      />
      <h1>{state.nome}</h1>
      <h2> {state.catergoriaHabilitacao} </h2>
      <h2> {state.numeroHabilitacao} </h2>
      <h2> {formatDate(state.vencimentoHabilitacao.toString())} </h2>
    </PageContainer>
  );
};

export default FCDriver;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const driver = await driversService.getDriverById(ctx.params?.slug as string);

  return {
    props: { driver },
  };
};
