import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import ReservationForm from './components/room';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import theme from './theme';
import Header from './components/header';
import Spline from '@splinetool/react-spline';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/test-environment' element={<div>Test Environment</div>} />
          <Route path='/' 
          element={
            <div>
              <Home />
              <Box sx={{ backgroundColor: '#1C232B', position: 'absolute', left: 0, right: 0, marginTop: 15, height: 800 }}>
                <Box sx={{ width: 1000, height: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 45, zoom: '1' }}>
                  <Spline scene='https://prod.spline.design/aJK3vLcIjRFcByVZ/scene.splinecode' />
                </Box>
              </Box>
            </div>
            } />
          <Route path='/reservation' element={
          <div className='room-form-container'>
            <ReservationForm />
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
