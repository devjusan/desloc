import { ButtonTypeMap, ExtendButtonBase } from '@mui/material';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface DialogProps {
    title: string;
    description: string;
    isOpen: boolean;
    Trigger: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
    Content: ReactNode;
    setOpen: Dispatch<SetStateAction<boolean>>;
    cbOnSubscribe: () => void;
    width?: string;
    height?: string;
    padding?: string;
}