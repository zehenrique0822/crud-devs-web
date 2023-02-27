import { Tooltip as TooltipMui, type TooltipProps } from '@mui/material'

export const Tooltip = (props: TooltipProps): JSX.Element => {
  return (
    <TooltipMui {...props}>
      {props.children}
    </TooltipMui>
  )
}
