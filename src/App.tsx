import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Developers, Home, Levels } from '@/pages'
import { Toaster } from 'react-hot-toast'

function App (): JSX.Element {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/levels" element={<Levels/>} />
            <Route path="/developers" element={<Developers/>} />
        </Routes>
        <Toaster
        position="top-right"
      />
      </BrowserRouter>
  )
}

export default App
