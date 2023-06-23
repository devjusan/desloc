import { TextField, TextFieldProps, TextFieldVariants } from '@mui/material';

const Input: <Variant extends TextFieldVariants>(
  props: {
    variant?: Variant;
  } & Omit<TextFieldProps, 'variant'>
) => JSX.Element = ({ ...props }) => {
  return <TextField {...props} />;
};

export default Input;
