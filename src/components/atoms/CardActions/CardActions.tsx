import { CardActions as CardActionsMui, type CardActionsProps } from '@mui/material'

export const CardActions = (props: CardActionsProps): JSX.Element => {
  return (
    <CardActionsMui {...props}>
      {props.children}
    </CardActionsMui>
  )
}
