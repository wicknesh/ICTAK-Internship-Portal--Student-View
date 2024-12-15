import { useState } from 'react'
import './App.css'
import HomePage from './components/Homepage'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';







function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <Routes>
    <Route path='/' element={<Layout child={<HomePage/>}/>}></Route>

    </Routes>

{/*   
<Layout> <HomePage/></Layout> */}


    </>
  )
}

export default App
