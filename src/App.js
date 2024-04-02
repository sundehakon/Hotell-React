import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoomForm from './components/RoomForm';
import Home from './components/Home';
import Profile from './components/Profile';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import SideNav from './components/SideNav';
import { useAuth0 } from '@auth0/auth0-react';
import Auth0ProviderWithHistory from './auth0provider';

function App() {
  const { isAuthenticated } = useAuth0();
  console.log("Is Authenticated:", isAuthenticated);

  return (
    <Auth0ProviderWithHistory>
    <ThemeProvider theme={theme}>
      <Router>
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
        </Routes>
      </Router>
    </ThemeProvider>
    </Auth0ProviderWithHistory>
  );
}

export default App;
