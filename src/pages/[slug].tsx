import { PageContainer } from '@/src/css/global';
import { clientService, toastService } from '@/src/services';
import { GetServerSideProps } from 'next';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Client } from '../types/clients';
import Dialog from '../components/portals/dialog';
import { PAGE_MESSAGES } from '../config/messages/pages';
import { Button } from '@mui/material';
import Input from '../components/ui/input';
import { messages } from '../config/messages/general';
import { isEqual } from 'lodash';
import { mutate } from 'swr';

const FCClient: FC<{ client: Client }> = ({ client }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(Object.assign({}, { ...client }) as Client);
  const formEntries = Object.entries(form);
  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof Client
  ) => {
    e.preventDefault();

    setForm({ ...form, [key]: e.target.value });
  };

  const onSubmit = async () => {
    const data = { ...client };

    if (isEqual(data, form)) {
      toastService.error(messages.clients.equal);
      return;
    }

    await clientService.updateClient(form, data.id.toString());
    setOpen(false);

    mutate('/api/clients');
  };

  return (
    <PageContainer
      styles={{ flexDirection: 'column', gap: '2rem', alignItems: 'center' }}
    >
      <Dialog
        title={PAGE_MESSAGES.CLIENT.DIALOG.EDIT.TITLE(form.nome)}
        description={PAGE_MESSAGES.CLIENT.DIALOG.EDIT.SUBTITLE}
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
                onChange={(e) => onChange(e, key as keyof Client)}
              />
            ))}
          </>
        }
        Trigger={() => <Button variant='contained'>Editar cliente</Button>}
      />
      <h1>{form.nome}</h1>
      <h2>
        {form.tipoDocumento}: {form.numeroDocumento}
      </h2>
      <h2>
        {form.logradouro}, {form.numero}
      </h2>
      <h2>
        {form.bairro}, {form.cidade} - {form.uf}
      </h2>
    </PageContainer>
  );
};

export default FCClient;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params as { slug: string };
  const client = await clientService.getClientById(slug);

  return {
    props: { client },
  };
};
