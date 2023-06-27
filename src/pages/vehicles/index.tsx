import Input from '@/src/components/ui/input';
import Item from '@/src/components/ui/item';
import { messages } from '@/src/config/messages/general';
import { PAGE_MESSAGES } from '@/src/config/messages/pages';
import { PageContainer } from '@/src/css/global';
import { vehicleInputs } from '@/src/helpers/formInputs';
import useFetch from '@/src/hooks/useFetch';
import useForm from '@/src/hooks/useForm';
import { toastService, vehicleService } from '@/src/services';
import { Vehicle } from '@/src/types/vehicles';
import { vehicleFormSchema } from '@/src/utils/form-schema.utils';
import { Button, CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

const DynamicDialog = dynamic(() => import('@/src/components/portals/dialog'), {
  loading: () => (
    <PageContainer styles={{ alignItems: 'center' }}>
      <CircularProgress />
    </PageContainer>
  ),
});

interface Response {
  response: { vehicles: Vehicle[] };
  isLoading: boolean;
  error: boolean;
  mutate: () => void;
}

const Vehicles: FC = () => {
  const { state, errors, isValid, onChange, setInitialErrorsState } = useForm(
    vehicleFormSchema(),
    vehicleInputs()
  );
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const vehicleEntries = Object.entries(state);

  const { response, isLoading, error, mutate } = useFetch(
    'api/vehicles'
  ) as unknown as Response;

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

  const onSubmit = async () => {
    try {
      await vehicleService.createVehicle(state as unknown as Vehicle);
      setInitialErrorsState();
      setOpen(false);

      mutate();
    } catch (error) {
      setInitialErrorsState();
      toastService.error(messages.error.default);
      setOpen(false);
    }
  };

  const onDelete = async () => {
    try {
      await vehicleService.deleteVehicle(
        response?.vehicles[0]?.id?.toString() as string
      );
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Veículos | Deslocamento</title>
      </Head>
      <PageContainer
        styles={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <DynamicDialog
          title={PAGE_MESSAGES.VEHICLE.DIALOG.CREATE.TITLE}
          description={PAGE_MESSAGES.VEHICLE.DIALOG.CREATE.SUBTITLE}
          isOpen={open}
          setOpen={setOpen}
          cbOnSubscribe={onSubmit}
          disableSubmitBtn={!isValid}
          Content={
            <>
              {vehicleEntries.map(([key]) => (
                <Input
                  key={key}
                  id={key}
                  label={key}
                  variant='standard'
                  onChange={onChange}
                  name={key}
                  error={errors[key]?.hasError}
                  helperText={errors[key]?.message}
                />
              ))}
            </>
          }
          Trigger={() => (
            <Button
              sx={{
                my: '2rem',
              }}
              variant='contained'
            >
              Criar veículo
            </Button>
          )}
        />

        <>
          {response?.vehicles.map(({ id, placa, marcaModelo }, index) => {
            return (
              <Item
                key={id}
                cb={() => {
                  router.push(`/vehicles/${id}`);
                }}
                description={marcaModelo}
                title={placa}
                cbOnDelete={onDelete}
                index={index}
              />
            );
          })}
        </>
      </PageContainer>
    </>
  );
};

export default Vehicles;
