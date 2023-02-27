import { Button as ButtonMui, type ButtonProps } from '@mui/material'

export const Button = (props: ButtonProps): JSX.Element => {
  return (
    <ButtonMui
      {...props}>
      {props.children}
    </ButtonMui>
  )
}
