import { Card as CardMui, type CardProps } from '@mui/material'

export const Card = (props: CardProps): JSX.Element => {
  return (
    <CardMui {...props}>
      {props.children}
    </CardMui>
  )
}
