import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import RoomForm from './components/room';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import SideNav from './components/SideNav';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SideNav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={
          <div className='room-form-container'>
            <RoomForm />
          </div>
          } />
          <Route path='/profile' element={
            <div>
              <Profile />
            </div>} 
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
