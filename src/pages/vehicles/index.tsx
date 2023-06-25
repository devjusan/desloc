import Dialog from '@/src/components/portals/dialog';
import Input from '@/src/components/ui/input';
import Item from '@/src/components/ui/item';
import { messages } from '@/src/config/messages/general';
import { PAGE_MESSAGES } from '@/src/config/messages/pages';
import { PageContainer } from '@/src/css/global';
import { vehicleInputs } from '@/src/helpers/formInputs';
import useFetch from '@/src/hooks/useFetch';
import { toastService, vehicleService } from '@/src/services';
import { Vehicle } from '@/src/types/vehicles';
import { Button, CircularProgress } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, useState } from 'react';

interface Response {
  response: { vehicles: Vehicle[] };
  isLoading: boolean;
  error: boolean;
  mutate: () => void;
}

const Vehicles: FC = () => {
  const inputs = vehicleInputs();
  const router = useRouter();
  const [form, setForm] = useState(Object.assign({}, inputs) as Vehicle);
  const [open, setOpen] = useState(false);
  const vehicleEntries = Object.entries(inputs);

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

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof Vehicle
  ) => {
    e.preventDefault();

    setForm({ ...form, [key]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      await vehicleService.createVehicle(form);
      setOpen(false);

      mutate();
    } catch (error) {
      toastService.error(messages.error.default);
      setOpen(false);
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
        <Dialog
          title={PAGE_MESSAGES.VEHICLE.DIALOG.CREATE.TITLE}
          description={PAGE_MESSAGES.VEHICLE.DIALOG.CREATE.SUBTITLE}
          isOpen={open}
          setOpen={setOpen}
          cbOnSubscribe={onSubmit}
          Content={
            <>
              {vehicleEntries.map(([key]) => (
                <Input
                  key={key}
                  id={key}
                  label={key}
                  variant='standard'
                  onChange={(e) => onChange(e, key as keyof Vehicle)}
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
