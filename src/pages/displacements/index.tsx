import Head from 'next/head';
import { ChangeEvent, FC, useState } from 'react';
import { PageContainer } from '@/src/css/global';
import { useRouter } from 'next/router';
import useFetch from '@/src/hooks/useFetch';
import { Button, CircularProgress, SelectChangeEvent } from '@mui/material';
import { displacementService, toastService } from '@/src/services';
import { messages } from '@/src/config/messages/general';
import { Displacement } from '@/src/types/displacements';
import Item from '@/src/components/ui/item';
import Input from '@/src/components/ui/input';
import Dialog from '@/src/components/portals/dialog';
import { PAGE_MESSAGES } from '@/src/config/messages/pages';
import { displacementInputs } from '@/src/helpers/formInputs';
import {
  handleType,
  isDisplacement,
  orderedDisplacementInput,
} from '@/src/utils/form.utils';
import { formatDate } from '@/src/utils/formatter.utils';
import DisplacementOptionsList from '@/src/components/ui/displacement-options-list';

interface Response {
  response: { displacements: Displacement[] };
  isLoading: boolean;
  error: boolean;
  mutate: () => void;
}

const Displacements: FC = () => {
  const inputs = displacementInputs();
  const { uniq, list } = orderedDisplacementInput();
  const [form, setForm] = useState(Object.assign({}, inputs) as Displacement);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { response, isLoading, error, mutate } = useFetch(
    'api/displacements'
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
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>,
    key: keyof Displacement
  ) => {
    e.preventDefault();

    setForm({ ...form, [key]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      await displacementService.createDisplacement(form);
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
      await displacementService.deleteDisplacement(
        response?.displacements[0]?.id?.toString() as string
      );
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Deslocamentos | Deslocamento</title>
      </Head>
      <PageContainer
        styles={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Dialog
          title={PAGE_MESSAGES.DISPLACEMENT.DIALOG.CREATE.TITLE}
          description={PAGE_MESSAGES.DISPLACEMENT.DIALOG.CREATE.SUBTITLE}
          isOpen={open}
          setOpen={setOpen}
          cbOnSubscribe={onSubmit}
          Content={
            <>
              {uniq.map((key) => (
                <Input
                  key={key}
                  id={key}
                  variant='standard'
                  aria-label={key}
                  InputLabelProps={{
                    shrink: isDisplacement(key as keyof Displacement)
                      ? true
                      : undefined,
                  }}
                  type={handleType(key as keyof Displacement)}
                  label={key}
                  onChange={(e) => onChange(e, key as keyof Displacement)}
                />
              ))}
              <DisplacementOptionsList form={form} onChange={onChange} />
            </>
          }
          Trigger={() => (
            <Button
              sx={{
                my: '2rem',
              }}
              variant='contained'
            >
              Criar deslocamento
            </Button>
          )}
        />
        <>
          {response?.displacements.map(
            ({ id, inicioDeslocamento, fimDeslocamento }, index) => {
              return (
                <Item
                  key={id}
                  cb={() => {
                    router.push(`/displacements/${id}`);
                  }}
                  description={formatDate(inicioDeslocamento?.toString())}
                  title={formatDate(fimDeslocamento?.toString())}
                  cbOnDelete={onDelete}
                  index={index}
                />
              );
            }
          )}
        </>
      </PageContainer>
    </>
  );
};

export default Displacements;
