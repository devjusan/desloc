import { PageContainer } from '@/src/css/global';
import { clientService, toastService } from '@/src/services';
import { GetServerSideProps } from 'next';
import { FC, useState } from 'react';
import { Client } from '../types/clients';
import Dialog from '../components/portals/dialog';
import { PAGE_MESSAGES } from '../config/messages/pages';
import { Button } from '@mui/material';
import Input from '../components/ui/input';
import { messages } from '../config/messages/general';
import { isEqual } from 'lodash';
import { mutate } from 'swr';
import { clientFormSchema } from '../utils/form-schema.utils';
import useForm from '../hooks/useForm';

const FCClient: FC<{ client: Client }> = ({ client }) => {
  const { state, errors, isValid, onChange } = useForm(
    clientFormSchema(),
    client,
    false
  );
  const [open, setOpen] = useState(false);
  const formEntries = Object.entries(state);

  const onSubmit = async () => {
    try {
      const data = { ...client };

      if (isEqual(data, state)) {
        toastService.error(messages.clients.equal);
        return;
      }

      await clientService.updateClient(
        state as unknown as Client,
        data.id.toString()
      );
      setOpen(false);

      mutate('/api/clients');
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
        title={PAGE_MESSAGES.CLIENT.DIALOG.EDIT.TITLE(state.nome)}
        description={PAGE_MESSAGES.CLIENT.DIALOG.EDIT.SUBTITLE}
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
                name={key}
                error={errors[key]?.hasError}
                helperText={errors[key]?.message}
                value={value}
                onChange={onChange}
              />
            ))}
          </>
        }
        Trigger={() => <Button variant='contained'>Editar cliente</Button>}
      />
      <h1>{state.nome}</h1>
      <h2>
        {state.tipoDocumento}: {state.numeroDocumento}
      </h2>
      <h2>
        {state.logradouro}, {state.numero}
      </h2>
      <h2>
        {state.bairro}, {state.cidade} - {state.uf}
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
