import { CircularProgress as CircularProgressMui, type CircularProgressProps } from '@mui/material'

export const CircularProgress = (props: CircularProgressProps): JSX.Element => {
  return (
    <CircularProgressMui {...props} />
  )
}
