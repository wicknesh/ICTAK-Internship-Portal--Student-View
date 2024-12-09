import { useState } from 'react'
import './App.css'
import HomePage from './components/Homepage'
import 'bootstrap/dist/css/bootstrap.min.css';

import CustomNavbar from './components/CustomNavbar';
import Layout from './components/Layout';







function App() {
  const [count, setCount] = useState(0)

  return (
    <>

  
<Layout> <HomePage/></Layout>


    </>
  )
}

export default App
