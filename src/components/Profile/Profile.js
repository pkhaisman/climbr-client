import React from 'react'
import Modal from 'react-modal'
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
            updated: false,
            showModal: false
        }
    }

    componentDidMount() {
        this.setState({
            showModal: true
        })
    }

    showModal = () => {
        this.setState({
            showModal: true
        })
    }

    hideModal = () => {
        this.setState({
            showModal: false
        })
    }

    handleSubmit = (e, name, bio, image) => {
        e.preventDefault()
        ApiService.updateUser(this.context.currentUser.id, name, bio, image)
            .then(updatedUser => {
                window.scrollTo(0, 0);
                this.context.updateUser(updatedUser)
                this.setState({
                    updated: true
                })
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
            .catch(res => {
                console.log(res)
            })
    }

    renderImageUplader = () => {
        return this.state.image
            ? <img className='Profile__Form_user-image' src={this.state.image} />
            : <div className='Profile__Form__user-input__image__container'>
                <label className='Profile__Form__user-input__image' htmlFor=''>Upload a picture!</label>
                <input className='Profile__Form__user-input__image' type='file' accept="image/*" onChange={(e) => this.handleImageChange(e)}></input>
            </div>
    }

    renderUpdateMessage = () => {
        return this.state.updated
            ? <div className= 'update-text'>Updated</div>
            : null
    }

    render() {
        const modalStyle = {
            content: {
                height: '300px',
            }
        }

        if (this.state.showModal && !this.context.currentUser.name) {
            return (
                <Modal
                    style={modalStyle}
                    isOpen={this.state.showModal}
                    onRequestClose={this.hideModal}
                    contentLabel="Example Modal"
                >
                    <h2>Welcome to Climbr!</h2>
                    <p>1) To begin please upload a picture, add your name, and write a short bio</p>
                    <p>2) Then, click on the 'swipe' tab to see users to swipe</p>
                    <p>3) Swipe left if you are not interested in connecting. Swipe right if you are</p>
                    <p>4) Click on the 'match' tab to see if you have any matches</p>
                    <p>5) If you do, click on your match's name to open up a chat!</p>
                    <p>6) Have fun!</p>
                </Modal>
            )
        }

        return (
            <div className='container'>
                {this.renderUpdateMessage()}
                <div className='flex-container'>
                    <div className='Profile'>
                        <form className='Profile__Form' onSubmit={e => this.handleSubmit(e, this.state.name, this.state.bio, this.state.image)}>
                            <div className='Profile__Form__user-inputs'>
                                {this.renderImageUplader()}

                                {/* <label htmlFor='profile-name'>Name</label> */}
                                <input className='Profile__Form__user-inputs__name' type='text' name='profile-name' 
                                    id='profile-name' value={this.state.name} placeholder='Name' 
                                    onChange={(e) => this.handleNameChange(e.target.value)}></input> 

                                <hr style={{
                                      border: 0,
                                      clear: 'both',
                                      display: 'block',
                                      width: '96%',              
                                      backgroundColor: '#e8e8e8',
                                      height: '1px',
                                }} /> 

                                {/* <label className='Profile__Form__user-labels__bio' htmlFor='profile-bio'>About</label> */}
                                <textarea className='Profile__Form__user-inputs__bio' type='text' name='profile-bio' 
                                    id='profile-bio' value={this.state.bio} placeholder='Write a short bio!'
                                    onChange={(e) => this.handleBioChange(e.target.value)}></textarea> 
                            </div>
                            <div className='Profile__Form__button-container'>
                                <button className='Form__buttons_submit Profile__Form__button-submit' type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile