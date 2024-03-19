import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InputForm from './InputForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<InputForm />} />
      </Routes>
    </Router>
  );
}

export default App;
