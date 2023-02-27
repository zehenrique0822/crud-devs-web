import { Avatar as AvatarMui, type AvatarProps } from '@mui/material'

export const Avatar = (props: AvatarProps): JSX.Element => {
  return (
    <AvatarMui {...props}>
      {props.children}
    </AvatarMui>
  )
}
