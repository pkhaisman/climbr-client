import React from 'react';
import './Hero.css';

class Hero extends React.Component {
    render() {
        return (
            <div className='Hero'>
                <div className='Hero__title-container'>
                    <h1 className='Hero__title-container__title'>CONNECT WITH LOCAL CLIMBERS</h1>
                </div>
            </div>
        );
    }
}

export default Hero;