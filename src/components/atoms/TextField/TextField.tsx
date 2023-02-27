import { TextField as TextFieldMui, type TextFieldProps } from '@mui/material'

export const TextField = (props: TextFieldProps): JSX.Element => {
  return (
    <TextFieldMui {...props} />
  )
}
