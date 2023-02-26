import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Developers, Home, Levels } from '@/pages'

function App (): JSX.Element {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/levels" element={<Levels/>} />
            <Route path="/developers" element={<Developers/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
