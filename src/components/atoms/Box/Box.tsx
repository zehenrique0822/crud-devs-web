import { Box as BoxMui, type BoxProps } from '@mui/material'

export const Box = (props: BoxProps): JSX.Element => {
  return (
    <BoxMui {...props}>
      {props.children}
    </BoxMui>
  )
}
