import React, { useState, useEffect } from 'react';
import '../css/BoardCard.css'

const colors = [
    'linear-gradient(to bottom right, #1565C0, #4FC3F7)', 
    'linear-gradient(to bottom right, #e74c3c, #f39c12)', 
    'linear-gradient(to bottom right, #272798, #7E7EF0)',
    'linear-gradient(to bottom right, #6A1B9A, #E91E63)'];

const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

const BoardCard = ({ boardname }) => {
    const [bgColor, setBgColor] = useState('');

    useEffect(() => {
        // Genera un color aleatorio al montar el componente
        setBgColor(getRandomColor());
    }, []);

    const style = {
        padding: '20px',
        margin: '10px',
        color: 'white',
        borderRadius: '5px',
        background: bgColor,
    };
    return (
        <div className='boardcard'>
            <button className="card" style={style}>
            <h3>{boardname}</h3>
        </button>
        </div>
    )

}



export default BoardCard