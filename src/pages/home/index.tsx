import { Link } from 'react-router-dom'

export const Home = (): JSX.Element => {
  return (
    <>
      <Link to="/levels">
        <p>LEVELS</p>
      </Link>
    </>
  )
}
