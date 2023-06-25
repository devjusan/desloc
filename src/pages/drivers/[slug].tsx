import Dialog from '@/src/components/portals/dialog';
import Input from '@/src/components/ui/input';
import { messages } from '@/src/config/messages/general';
import { PAGE_MESSAGES } from '@/src/config/messages/pages';
import { PageContainer } from '@/src/css/global';
import { driversService, toastService } from '@/src/services';
import { Driver } from '@/src/types/drivers';
import { formatDate } from '@/src/utils/formatter.utils';
import { Button } from '@mui/material';
import { isEqual } from 'lodash';
import { GetServerSideProps } from 'next';
import { ChangeEvent, FC, useState } from 'react';
import { mutate } from 'swr';

const FCDriver: FC<{ driver: Driver }> = ({ driver }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(Object.assign({}, { ...driver }) as Driver);
  const formEntries = Object.entries(form);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof Driver
  ) => {
    e.preventDefault();

    setForm({ ...form, [key]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      const data = { ...driver };

      if (isEqual(data, form)) {
        toastService.error(messages.drivers.equal);
        return;
      }

      await driversService.updateDriver(form, data.id?.toString() as string);
      setOpen(false);

      mutate('/api/drivers');
    } catch (error) {
      toastService.error(messages.error.default);
      setOpen(false);
    }
  };

  return (
    <PageContainer
      styles={{ flexDirection: 'column', gap: '2rem', alignItems: 'center' }}
    >
      <Dialog
        title={PAGE_MESSAGES.DRIVER.DIALOG.EDIT.TITLE(form.nome)}
        description={PAGE_MESSAGES.DRIVER.DIALOG.EDIT.SUBTITLE}
        isOpen={open}
        setOpen={setOpen}
        cbOnSubscribe={onSubmit}
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
                onChange={(e) => onChange(e, key as keyof Driver)}
              />
            ))}
          </>
        }
        Trigger={() => <Button variant='contained'>Editar condutor</Button>}
      />
      <h1>{form.nome}</h1>
      <h2> {form.catergoriaHabilitacao} </h2>
      <h2> {form.numeroHabilitacao} </h2>
      <h2> {formatDate(form.vencimentoHabilitacao.toString())} </h2>
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
