import React from 'react'

import './CardContent.css'

class CardContent extends React.Component {
    render() {
        return (
            <div className='CardContent'>
                {this.props.firstName}
            </div>
        )
    }
}

export default CardContent