import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoomForm from './components/RoomForm';
import Home from './components/Home';
import RegisterForm from './components/RegisterForm';
import LogInForm from './components/LogInForm';
import Profile from './components/Profile';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme/theme';
import SideNav from './components/SideNav';
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
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
