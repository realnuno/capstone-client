import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {Link} from 'react-router-dom';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {username, password, firstName, lastName};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <form
                className="signup-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
				<h1 className="title">
                	Travelers
                </h1>
				<h1 className="section-title">sign up</h1>
                <Field component={Input} placeholder="First name" type="text" name="firstName" />
                <Field component={Input} placeholder="Last name" type="text" name="lastName" />
                <Field
                    component={Input}
                    type="email"
					placeholder="email" 
                    name="username"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <Field
                    component={Input}
                    type="password"
					placeholder="password" 
                    name="password"
                    validate={[required, passwordLength, isTrimmed]}
                />
                <Field
                    component={Input}
                    type="password"
					placeholder="passwordConfirm" 
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matchesPassword]}
                />
                <button
                    type="submit"
					className="button signup-button"
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                </button>
                <Link id="change-to-log-in-button" className="button change-to-log-in-button" to="/">Login</Link>
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
