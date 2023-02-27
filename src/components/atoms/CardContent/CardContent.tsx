import { CardContent as CardContentMui, type CardContentProps } from '@mui/material'

export const CardContent = (props: CardContentProps): JSX.Element => {
  return (
    <CardContentMui {...props}>
      {props.children}
    </CardContentMui>
  )
}
