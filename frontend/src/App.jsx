import './App.css'
import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import ProjectBoard from './components/Project_board';
import WeeklySubmission from './components/WeeklySubmission';
import FinalSubmission from './components/FinalSubmission';
import Vivavoce from './components/Vivavoce';
import DiscussionForum from './components/DiscussionForum';

const App = () => {
  return (
    <>
    
      <BrowserRouter>
      <Routes>
       <Route path ="/projectboard" element={<ProjectBoard/>} />
     <Route path="/weekly-submission" element={<WeeklySubmission />} />
       <Route path="/final-submission" element={<FinalSubmission />} />  
       <Route path='/vivavoce' element={<Vivavoce/>}/>
       <Route path='/discussionforum' element={<DiscussionForum/>}/>
      </Routes>
     </BrowserRouter> 
    </>
  )
};

export default App;
