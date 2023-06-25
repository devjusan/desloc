import Dialog from '@/src/components/portals/dialog';
import Input from '@/src/components/ui/input';
import Item from '@/src/components/ui/item';
import { messages } from '@/src/config/messages/general';
import { PAGE_MESSAGES } from '@/src/config/messages/pages';
import { PageContainer } from '@/src/css/global';
import { driverInputs } from '@/src/helpers/formInputs';
import useFetch from '@/src/hooks/useFetch';
import { driversService, toastService } from '@/src/services';
import { Driver } from '@/src/types/drivers';
import { Button, CircularProgress } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, useState } from 'react';

interface Response {
  response: { drivers: Driver[] };
  isLoading: boolean;
  error: boolean;
  mutate: () => void;
}

const Drivers: FC = () => {
  const inputs = driverInputs();
  const driverEntries = Object.entries(inputs);
  const [form, setForm] = useState(Object.assign({}, inputs) as Driver);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { response, isLoading, error, mutate } = useFetch(
    'api/drivers'
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
    key: keyof Driver
  ) => {
    e.preventDefault();

    setForm({ ...form, [key]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      const { catergoriaHabilitacao, id, ...rest } = form;

      await driversService.createDriver({
        ...rest,
        categoriaHabilitacao: catergoriaHabilitacao,
      });
      setOpen(false);

      mutate();
    } catch (error) {
      toastService.error(messages.error.default);
      setOpen(false);

      console.error(error);
    }
  };

  const onDelete = async () => {
    try {
      await driversService.deleteDriver(
        response?.drivers[0]?.id?.toString() as string
      );
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Condutores | Deslocamento</title>
      </Head>
      <PageContainer
        styles={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Dialog
          title={PAGE_MESSAGES.DRIVER.DIALOG.CREATE.TITLE}
          description={PAGE_MESSAGES.DRIVER.DIALOG.CREATE.SUBTITLE}
          isOpen={open}
          setOpen={setOpen}
          cbOnSubscribe={onSubmit}
          Content={
            <>
              {driverEntries.map(([key]) => (
                <Input
                  key={key}
                  id={key}
                  label={key === 'vencimentoHabilitacao' ? '' : key}
                  variant='standard'
                  type={key === 'vencimentoHabilitacao' ? 'date' : 'text'}
                  onChange={(e) => onChange(e, key as keyof Driver)}
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
              Criar condutor
            </Button>
          )}
        />

        <>
          {response?.drivers.map(({ id, nome, numeroHabilitacao }, index) => {
            return (
              <Item
                key={id}
                cb={() => {
                  router.push(`/drivers/${id}`);
                }}
                description={numeroHabilitacao}
                title={nome}
                index={index}
                cbOnDelete={onDelete}
              />
            );
          })}
        </>
      </PageContainer>
    </>
  );
};

export default Drivers;
