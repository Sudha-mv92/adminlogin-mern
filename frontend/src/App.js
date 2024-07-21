import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormComponent from './components/FormComponents';
import TableComponent from './components/TableComponents';
import EditComponent from './components/EditFormComponents';
import NavBar from './components/NavBar'; // Import your NavBar component
import AdminLogin from './components/AdminLogin';
import Home from './components/Home';
import LogOut from './components/LogOut';

const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/form" element={<FormComponent />} />
                <Route path="/table" element={<TableComponent />} />
                 <Route path='/' element={<AdminLogin/>}/>
                <Route path="/edit/:id" element={<EditComponent />} />
                <Route path="/home" element={<Home/>}/>
                <Route path="/logout" element={<LogOut/>}/>
                {/* <Route path="/" element={<FormComponent />} /> Default route */}
            </Routes>
        </Router>
    );
};
export default App;
