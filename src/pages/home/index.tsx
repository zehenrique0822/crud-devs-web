import { Box } from '@/components'
import { Link } from 'react-router-dom'

export const Home = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
      }}
    >
      <Link to="/levels">
        <p>LEVELS</p>
      </Link>
    </Box>
  )
}
