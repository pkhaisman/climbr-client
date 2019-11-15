import React from 'react';
import './Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <div className='Footer'>
                <p className='Footer__content'>Created by <a className='Footer__link' target="_blank" rel="noopener noreferrer" href="https://pkhaisman.github.io/portfolio-site/">Philip Khaisman</a></p>
            </div>
        )
    }
}

export default Footer;