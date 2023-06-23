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

const FCClient: FC<{ client: Client }> = ({
  client: {
    bairro,
    cidade,
    logradouro,
    numero,
    nome,
    numeroDocumento,
    tipoDocumento,
    uf,
    id
  }
}) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(Object.assign(
    {},
    {
      bairro,
      cidade,
      logradouro,
      numero,
      nome,
      numeroDocumento,
      tipoDocumento,
      uf,
      id
    }
  ) as Client);
  const formEntries = Object.entries(form);
  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof Client
  ) => {
    e.preventDefault();

    setForm({ ...form, [key]: e.target.value });
  };

  const onSubmit = async () => {
    const client = {
      bairro,
      cidade,
      logradouro,
      numero,
      nome,
      numeroDocumento,
      tipoDocumento,
      uf,
      id
    };

    if (isEqual(client, form)) {
      toastService.error(messages.clients.equal);
      return;
    }

    await clientService.updateClient(form, id.toString());
    setOpen(false);
  };

  return (
    <PageContainer
      styles={{ flexDirection: 'column', gap: '2rem', alignItems: 'center' }}
    >
      <Dialog
        title={PAGE_MESSAGES.CLIENT.DIALOG.TITLE(nome)}
        description={PAGE_MESSAGES.CLIENT.DIALOG.SUBTITLE}
        isOpen={open}
        setOpen={setOpen}
        cbOnSubscribe={onSubmit}
        Content={
          <>
            {formEntries.map(([key, value]) => (
              <Input
                key={key}
                id={key}
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
    props: { client }
  };
};
