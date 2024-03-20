import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the hotel management system!</p>
            <a href='/register'>Register</a>
            <a href='/rooms'>Rooms</a>
        </div>
    );
}

export default Home;