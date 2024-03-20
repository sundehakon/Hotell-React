import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoomForm from './RoomForm';
import Home from './Home';
import RegisterForm from './RegisterForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/rooms' element={<RoomForm />} />
      </Routes>
    </Router>
  );
}

export default App;
