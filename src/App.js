import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoomForm from './components/RoomForm';
import Home from './components/Home';
import Profile from './components/Profile';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import SideNav from './components/SideNav';
import { useAuth0, Auth0Provider } from '@auth0/auth0-react';
import LoginButton from './components/login';
import LogoutButton from './components/logout';

function App() {
  const { isAuthenticated } = useAuth0();
  console.log("Is Authenticated:", isAuthenticated);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Auth0Provider
            domain="dev-bncxgcmnmpql2vnw.us.auth0.com"
            clientId="xGMiPSBEkyAAZeaYP4jIOrqM0syNXQSt"
            authorizationParams={{
              redirectUri: window.location.origin
            }}
        >
        <SideNav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={!isAuthenticated && <LoginButton />} />
          <Route path='/rooms' element={
          <div className='room-form-container'>
            <RoomForm />
          </div>
          } />
          <Route path='/profile' element={
            <div>
              <Profile />
              <LogoutButton />
            </div>} 
          />
        </Routes>
        </Auth0Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
