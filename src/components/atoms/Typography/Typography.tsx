import { Typography as TypographyMui, type TypographyProps } from '@mui/material'

export const Typography = (props: TypographyProps): JSX.Element => {
  return (
    <TypographyMui {...props}>
      {props.children}
    </TypographyMui>
  )
}
