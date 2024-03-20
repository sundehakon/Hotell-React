import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InputForm from './InputForm';
import RoomForm from './RoomForm';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<InputForm />} />
        <Route path='/rooms' element={<RoomForm />} />
      </Routes>
    </Router>
  );
}

export default App;
