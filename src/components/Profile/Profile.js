import React from 'react'
import ClimbrContext from '../../contexts/ClimbrContext'
import ApiService from '../../services/api-service'

class Profile extends React.Component {
    static contextType = ClimbrContext

    constructor(props) {
        super(props)
        this.state = {
            name: props.name || '',
            bio: props.bio || '',
        }
    }

    handleSubmit = (e, name, bio) => {
        e.preventDefault()
        ApiService.updateUser(this.context.currentUser.id, name, bio)
            .then(updatedUser => {
                this.context.updateUser(updatedUser)
            })
    }

    handleNameChange = (name) => {
        this.setState({
            name
        })
    }

    handleBioChange = (bio) => {
        this.setState({
            bio
        })
    }

    render() {
        return (
            <div className='Profile'>
                <form className='ProfileForm' onSubmit={e => this.handleSubmit(e, this.state.name, this.state.bio, this.state.image)}>
                <h2 className='ProfileForm__title'>Profile</h2>
                <div className='ProfileForm-user-inputs'>
                    <label className='ProfileForm__user-label' htmlFor='profile-name'>Name</label>
                    <input className='ProfileForm__user-input' type='text' name='profile-name' 
                        id='profile-name' value={this.state.name} 
                        onChange={(e) => this.handleNameChange(e.target.value)}></input> 

                    <label className='ProfileForm__user-label' htmlFor='profile-bio'>Bio</label>
                    <input className='ProfileForm__user-input' type='text' name='profile-bio' 
                        id='profile-bio' value={this.state.bio}
                        onChange={(e) => this.handleBioChange(e.target.value)}></input>

                </div>
                <div className='ProfileForm__buttons'>
                    <button className='ProfileForm__buttons__add' type='submit'>Submit</button>
                </div>
            </form>
            </div>
        )
    }
}

export default Profile