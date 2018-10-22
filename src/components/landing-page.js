import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/search-page" />;
    }

    return (
        <div>
        <div className="login-page">
            <LoginForm />
        </div>
                <h4 className='intro'>
                    Find your next vacation destination.<br/> Get local popular venues, attractions and detailed maps for any location in the world.
                </h4>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
