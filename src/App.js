import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import RoomForm from './components/room';
import Home from './components/home';
import Profile from './components/profile';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import SideNav from './components/sidenav';
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
        cacheLocation='localstorage'
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
