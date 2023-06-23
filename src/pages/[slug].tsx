import { PageContainer } from '@/src/css/global';
import { clientService } from '@/src/services';
import { GetServerSideProps } from 'next';
import { FC, useState } from 'react';
import { Client } from '../types/clients';
import Dialog from '../components/portals/dialog';
import { PAGE_MESSAGES } from '../config/messages/pages';
import { Button, TextField } from '@mui/material';

const FCClient: FC<{ client: Client }> = ({
  client: {
    bairro,
    cidade,
    logradouro,
    numero,
    nome,
    numeroDocumento,
    tipoDocumento,
    uf
  }
}) => {
  const [open, setOpen] = useState(false);
  const DialogContent = () => {
    return (
      <TextField
        autoFocus
        margin='dense'
        id='name'
        label='Email Address'
        type='email'
        fullWidth
        variant='standard'
      />
    );
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
        cbOnSubscribe={() => {}}
        Content={<DialogContent />}
        Trigger={() => <Button variant='contained'>Editar cliente</Button>}
      />
      <h1>{nome}</h1>
      <h2>
        {tipoDocumento}: {numeroDocumento}
      </h2>
      <h2>
        {logradouro}, {numero}
      </h2>
      <h2>
        {bairro}, {cidade} - {uf}
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
