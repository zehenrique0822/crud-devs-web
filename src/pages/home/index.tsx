import { Box, PresentationCard } from '@/components'
import lottieLevel from '../../assets/lotties/level.json'
import lottieDevelopers from '../../assets/lotties/developer.json'

export const Home = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        overflowY: 'hidden'
      }} >
      <Box
        sx={{
          width: '630px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            width: '300px',
            '> div': {
              marginBottom: '20px'
            }
          }
        }}
      >
        <PresentationCard
          name='Níveis'
          description='Listagem, edição e remoção de niveis dos desenvolvedores'
          lottie={lottieLevel}
          path="/levels"
        />
        <PresentationCard
          name='Desenvolvedores'
          description='Listagem, edição e remoção dos desenvolvedores'
          lottie={lottieDevelopers}
          path="/developers"
        />
      </Box>
    </Box>
  )
}
