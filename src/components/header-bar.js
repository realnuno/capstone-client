import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <div onClick={() => this.logOut()} id="nav-logout-button">log out</div>
            );
        }
        return (
            <nav role="navigation">
                <div className="nav-bar" >
                    <Link to="/">
                        <div className="main-search" id="nav-search-button">new place?</div>
                        {logOutButton}
                    </ Link>
                    <Link to="/mylist">
                        <div id="nav-mylist-button">my list</div>
                    </ Link>
                    <ion-icon id="nav-logout-icon" name="log-out"></ion-icon>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
