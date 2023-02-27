import { Box, CircularProgress } from '@/components'

export const AppLoadingProgress = (): JSX.Element => {
  return (
    <Box sx={{ height: '100vh', width: '100%', display: 'grid', placeItems: 'center' }}>
      <CircularProgress color="primary" />
    </Box>
  )
}
