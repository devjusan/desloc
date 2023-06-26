import Dialog from '@/src/components/portals/dialog';
import Input from '@/src/components/ui/input';
import { messages } from '@/src/config/messages/general';
import { PAGE_MESSAGES } from '@/src/config/messages/pages';
import { PageContainer } from '@/src/css/global';
import useForm from '@/src/hooks/useForm';
import { toastService, vehicleService } from '@/src/services';
import { Vehicle } from '@/src/types/vehicles';
import { vehicleFormSchema } from '@/src/utils/form-schema.utils';
import { formatDate } from '@/src/utils/formatter.utils';
import { Button } from '@mui/material';
import { isEqual } from 'lodash';
import { GetServerSideProps } from 'next';
import { FC, useState } from 'react';
import { mutate } from 'swr';

const FCVehicle: FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  const { state, errors, isValid, onChange, setInitialErrorsState } = useForm(
    vehicleFormSchema(),
    vehicle,
    false
  );

  const [open, setOpen] = useState(false);
  const formEntries = Object.entries(state);

  const onSubmit = async () => {
    try {
      const data = { ...vehicle };

      if (isEqual(data, state)) {
        toastService.error(messages.vehicles.equal);
        return;
      }

      await vehicleService.updateVehicle(
        state as unknown as Vehicle,
        data.id?.toString() as string
      );

      setInitialErrorsState();
      setOpen(false);
      mutate('/api/vehicles');
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
        title={PAGE_MESSAGES.VEHICLE.DIALOG.EDIT.TITLE(state.placa)}
        description={PAGE_MESSAGES.VEHICLE.DIALOG.EDIT.SUBTITLE}
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
        Trigger={() => <Button variant='contained'>Editar veículo</Button>}
      />
      <h1>{state.placa}</h1>
      <h2> {state.marcaModelo} </h2>
      <h2> {formatDate(state.anoFabricacao.toString())} </h2>
      <h2> {state.kmAtual} </h2>
    </PageContainer>
  );
};

export default FCVehicle;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const vehicle = await vehicleService.getVehicleById(
    ctx.params?.slug as string
  );

  return {
    props: { vehicle },
  };
};
