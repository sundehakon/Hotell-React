import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoomForm from './RoomForm';
import Home from './Home';
import RegisterForm from './RegisterForm';
import LogInForm from './LogInForm';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import SideNav from './SideNav';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');

  const setNavUsername = (name) => {
    setUsername(name);
  }
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SideNav setUsername={setUsername} username={username}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={
            <div className='register-form-container'>
              <RegisterForm  setNavUsername={setNavUsername}/>
            </div>
          } />
          <Route path='/login' element={
            <div className='login-form-container'>
              <LogInForm />
            </div>
          } />
          <Route path='/rooms' element={
          <div className='room-form-container'>
            <RoomForm />
          </div>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
