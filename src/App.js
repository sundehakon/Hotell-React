import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import ReservationForm from './components/room';
import AdminPage from './components/admin';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Header from './components/header';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/test-environment' element={<div>Test Environment</div>} />
          <Route path='/admin' element={<AdminPage />}/>
          <Route path='/' 
          element={
            <div>
              <Home />
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
