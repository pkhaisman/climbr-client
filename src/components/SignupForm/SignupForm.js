import React, {Component} from 'react';

class  SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
        }
    }

    handleChange = (e) => {
        this.setState({username: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onSubmit(this.state.username);
    }

    render() {
        return(
            <div className="SignupForm">
                <h1>Let's Talk</h1>
                <form onSubmit={this.handleSubmit} className="SignupForm__form">
                    <label htmlFor="email">What is your email?</label>
                    <input type="email" name="username" onChange={this.handleChange} className="SignupForm__input" />
                    <button className="SignupForm__submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default SignupForm;