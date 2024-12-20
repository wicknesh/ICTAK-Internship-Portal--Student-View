import './App.css'
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
// import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentDashboard from './components/StudentDashboard'
import { StudentProvider } from './components/StudentProvider.jsx';
import DiscussionForum from './components/Discussionform.jsx';
import ProjectBoard from './components/Projectdash.jsx';

function App() {

  return (
    <>
    <StudentProvider>
      <Routes>
          {/* <Route path='/' element={<Layout child={<HomePage/>}/>}></Route> */}
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/student-dashboard' element={<StudentDashboard />} />
          <Route path='/Discussion' element={<DiscussionForum/>} />
          <Route path='/Project' element={<ProjectBoard/>} />
        </Routes>
    </StudentProvider>
    </>
  )
}

export default App