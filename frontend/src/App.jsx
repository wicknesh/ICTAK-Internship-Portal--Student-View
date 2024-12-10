import { useState } from 'react'
import './App.css'
import HomePage from './components/Homepage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import CustomNavbar from './components/CustomNavbar';
import Layout from './components/Layout';
import ProjectBoard from './components/Project_board';
import WeeklySubmission from './components/WeeklySubmission';
import FinalSubmission from './components/FinalSubmission';
import Vivavoce from './components/Vivavoce';
import DiscussionForum from './components/DiscussionForum';







function App() {
  const [count, setCount] = useState(0)

  return (
    <>

  
<Layout> <HomePage/></Layout>
<BrowserRouter>
      <Routes>
       <Route path ="/" element={<ProjectBoard/>} />
     <Route path="/weekly-submission" element={<WeeklySubmission />} />
       <Route path="/final-submission" element={<FinalSubmission />} />  
       <Route path='/vivavoce' element={<Vivavoce/>}/>
       <Route path='/discussionforum' element={<DiscussionForum/>}/>
      </Routes>
     </BrowserRouter> 

    </>
  )
}

export default App
