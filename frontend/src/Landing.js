import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import TableComponent from './components/TableComponents';
import EditComponent from './components/EditFormComponents';
import Home from './components/Home';
// import App from './App';
import FormComponent from './components/FormComponents';
import LogOut from './components/LogOut';


const Landing = () => {
  return (
    <div>
       <Router>
           
            <Routes>
               
                 <Route path='/' element={<AdminLogin/>}/>
                <Route path='/form' element={<FormComponent/>}/>
                <Route path="/table" element={<TableComponent />} />
                <Route path="/edit/:id" element={<EditComponent />} />
                <Route path="/home" element={<Home/>}/>
                <Route path="/logout" element={<LogOut/>}/>
               
            </Routes>
        </Router>
    </div>
  )
}

export default Landing
