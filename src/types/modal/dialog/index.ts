import { ButtonTypeMap, ExtendButtonBase } from '@mui/material';
import { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';

export interface DialogProps {
  title: string;
  description: string;
  isOpen: boolean;
  Trigger:
    | ExtendButtonBase<ButtonTypeMap<{}, 'button'>>
    | (() => React.JSX.Element);
  Content: ReactElement;
  setOpen: Dispatch<SetStateAction<boolean>>;
  cbOnSubscribe: () => void;
  width?: string;
  height?: string;
}
