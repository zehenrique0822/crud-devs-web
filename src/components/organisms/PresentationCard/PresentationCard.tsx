import { Box, Button, Card, CardActions, CardContent, Typography } from '@/components'
import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'

interface Props {
  name: string
  path: string
  description: string
  lottie: any
}

export const PresentationCard = ({ name, path, description, lottie }: Props): JSX.Element => {
  return (
    <Card sx={{
      maxWidth: 300,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '5px',
      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
    }}>
      <Box sx={{ maxWidth: 140 }}>
        <Lottie animationData={lottie} loop={true} />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link style={{ textDecoration: 'none' }} to={path}>
          <Button size="medium" variant="contained">Ver Mais</Button>
        </Link>
      </CardActions>
    </Card>
  )
}
