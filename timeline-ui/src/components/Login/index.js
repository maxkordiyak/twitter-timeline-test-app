import React, { Component } from 'react';
import { connect } from 'react-redux';
import TwitterLogin from 'react-twitter-auth';
import { onLoginError, onLoginSuccess } from '../../actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLoginError = this.onLoginError.bind(this);
    }

    onLoginSuccess(response) {
        const token = response.headers.get('x-auth-token');
        response.json().then(user => {
            this.props.onLoginSuccess(token, user);
        })

    };

    onLoginError(error) {
        this.props.onLoginError(error);
    };

    render() {
        return(
                <TwitterLogin
                    loginUrl="http://localhost:3001/api/user/auth/twitter"
                    onFailure={this.onLoginError}
                    onSuccess={this.onLoginSuccess}
                    requestTokenUrl="http://localhost:3001/api/user/auth/twitter/reverse"
                />
            );
    }
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.user.errorMessage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoginSuccess: (token, user) => dispatch(onLoginSuccess(token, user)),
        onLoginError: error => dispatch(onLoginError(error.message))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);