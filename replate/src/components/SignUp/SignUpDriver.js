import React, { Component } from 'react';
import axios from 'axios';
import '../../css/SignUp.css';

class SignUpDriver extends Component {
    constructor(props){
        super(props);
    }

    state = {
        credentials : {
            username: '',
            password: '',
            passwordCheck: '',
            email: '',
            volunteerName: '',
            phoneNumber: '',
        },
        invalid : {
            password: false
        }
    };

    style = {
        Error: {
            border: '1px solid red'
        }
    }


    handleChange = e =>{
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        })
    }

    passwordCheck = () =>{
        this.setState({invalid: {
            ...this.state.invalid, 
            password: (this.state.credentials.passwordCheck !== this.state.credentials.password)
        }})
    }

    handlePhoneNumber = e =>{
        const re = /^[0-9\b]+$/;
        if(e.target.value === '' || (re.test(e.target.value) && e.target.value.length <= 10)){
            this.setState({
                credentials: {
                    ...this.state.credentials,
                    phoneNumber: e.target.value
                }
            });
        }
    }

    signUp = e =>{
        e.preventDefault();
        if(this.state.credentials.password !== this.state.credentials.passwordCheck){
            alert('password doesnt match')
            return;
        } else {
            console.log(this.state.credentials)
            axios.post('https://replate-bw.herokuapp.com/api/user/driver', 
                {
                    username: this.state.credentials.username,
                    email:  this.state.credentials.email,
                    password: this.state.credentials.password,
                    volunteerName: this.state.credentials.volunteerName,
                    phoneNumber: this.state.credentials.phoneNumber
                })
                .then(res =>{
                    console.log(res);
                    this.props.props.push('/Login');
                })
                .catch(err => console.log(err));
        }
        console.log(this.props)
    }

    render() {
        return (
            <div className='form'> 
                <form onSubmit={this.signUp}>
                    <label> Username: </label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                        required
                    />
                    <label> Password: </label>
                    <input
                        type='password'
                        name='password'
                        pattern=".{6,}"
                        title='password must be atleast 6 characters long'
                        id='password'
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                        style={this.state.invalid.password ? this.style.Error : null}
                        onBlur={this.passwordCheck}
                        required
                    />
                    <label> Re-Enter Password: </label>
                    <input
                        type='password'
                        name='passwordCheck'
                        id='passwordCheck'
                        value={this.state.credentials.passwordCheck}
                        onChange={this.handleChange}
                        onBlur={this.passwordCheck}
                        style={this.state.invalid.password ? this.style.Error : null}
                        required
                    />
                    <label> Email: </label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        value={this.state.credentials.email}
                        onChange={this.handleChange}
                        required
                    />
                    <label> Volunteer Name: </label>
                    <input
                        type='text'
                        name='volunteerName'
                        id='volunteerName'
                        value={this.state.credentials.volunteerName}
                        onChange={this.handleChange}
                        required
                    />
                    <label> Phone Number: </label>
                    <input
                        type='text'
                        name='phoneNumber'
                        id='phoneNumber'
                        value={this.state.credentials.phoneNumber}
                        onChange={this.handlePhoneNumber}
                    />
                    <input type='submit' value='Sign Up' />
                </form>
            </div>
        );
    }
}

export default SignUpDriver;