import { CardMedia as CardMediaMui, type CardMediaProps } from '@mui/material'

export const CardMedia = (props: CardMediaProps): JSX.Element => {
  return (
    <CardMediaMui {...props}>
      {props.children}
    </CardMediaMui>
  )
}
