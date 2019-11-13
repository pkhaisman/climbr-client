import React from 'react'
import config from '../../config'
import ClimbrContext from '../../contexts/ClimbrContext'
import ApiService from '../../services/api-service'
import './Profile.css'

class Profile extends React.Component {
    static contextType = ClimbrContext

    constructor(props) {
        super(props)
        this.state = {
            name: props.name || '',
            bio: props.bio || '',
            image: props.image || '',
        }
    }

    handleSubmit = (e, name, bio, image) => {
        e.preventDefault()
        ApiService.updateUser(this.context.currentUser.id, name, bio, image)
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

    handleImageChange = (e) => {
        // create array of files
        const files = Array.from(e.target.files)
        const formData = new FormData()
        
        // create key value pairs 'i': 'file'
        files.forEach((file, i) => {
            formData.append(i, file)
        })

        fetch(`${config.API_ENDPOINT}/image-upload`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(images => {
                this.setState({
                    image: images[0].secure_url
                })
            })
    }

    renderImageUplader = () => {
        return this.state.image
            ? <img src={this.state.image} height='400px' width='405' />
            : <input className='Profile__Form__user-input__image' type='file' onChange={(e) => this.handleImageChange(e)}></input>
    }

    render() {
        return (
            <div className='container'>
                <div className='flex-container'>
                    <div className='Profile'>
                        <form className='Profile__Form' onSubmit={e => this.handleSubmit(e, this.state.name, this.state.bio, this.state.image)}>
                            <div className='Profile__Form__user-inputs'>
                                {this.renderImageUplader()}

                                {/* <label htmlFor='profile-name'>Name</label> */}
                                <input className='Profile__Form__user-inputs__name' type='text' name='profile-name' 
                                    id='profile-name' value={this.state.name} placeholder='Name' 
                                    onChange={(e) => this.handleNameChange(e.target.value)}></input> 

                                <label className='Profile__Form__user-labels__bio' htmlFor='profile-bio'>About</label>
                                <textarea className='Profile__Form__user-inputs__bio' type='text' name='profile-bio' 
                                    id='profile-bio' value={this.state.bio}
                                    onChange={(e) => this.handleBioChange(e.target.value)}></textarea> 
                            </div>
                            <div className='Profile__Form__button-container'>
                                <button className='Profile__Form__submit-button' type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile