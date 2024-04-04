import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import RoomForm from './components/RoomForm';
import Home from './components/Home';
import Profile from './components/Profile';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import SideNav from './components/SideNav';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isAuthenticated } = useAuth0();
  console.log("Is Authenticated:", isAuthenticated);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
      >
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
      </Auth0Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
