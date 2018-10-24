import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import {Link} from 'react-router-dom';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.loginEmailInput, values.loginPasswordInput));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <h1 className="title">
                    Travelers
                </h1>
                <h1 className="section-title">log in</h1>
                <Field
                    component={Input}
                    type="email"
                    placeholder="email"
                    name="loginEmailInput"
                    id="login-email-input"
                    validate={[required, nonEmpty]}
                />
                <Field
                    component={Input}
                    type="password"
                    placeholder="password"
                    name="loginPasswordInput"
                    id="login-password-input"
                    validate={[required, nonEmpty]}
                />
                <div className="error-message">{error}</div>
                <p className="demo-account">-Demo account-</p>
                <p className="demo-id">id  :  demo@demo.com</p>
                <p className="demo-pass">pass  :  this-is-demo-pass</p>
                <button className="button" disabled={this.props.pristine || this.props.submitting}>
                    Log in
                </button>
                <p className="or">or</p>
                <Link to="/register" id="sign-up-button" className="button sign-up-button" >Register</Link>
            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
