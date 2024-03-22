import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoomForm from './RoomForm';
import Home from './Home';
import RegisterForm from './RegisterForm';
import LogInForm from './LogInForm';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={
            <div className='register-form-container'>
              <RegisterForm />
            </div>
          } />
          <Route path='/login' element={
            <div className='login-form-container'>
              <LogInForm />
            </div>
          } />
          <Route path='/rooms' element={<RoomForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
