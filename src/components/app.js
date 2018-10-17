import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter, Switch} from 'react-router-dom';
import LandingPage from './landing-page';
import SearchPage from './search-page';
import SearchResults from './search-results';
import EditItem from './edit-item';
import MyList from './myList-page'
import RegistrationPage from './registration-page';
import MoreDetail from './more-info';
import {refreshAuthToken} from '../actions/auth';
import Footer from './footer'

export class App extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            <div className="app">
			<Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/moreinfo/:id" component={MoreDetail} />
                <Route path="/search-page" component={SearchPage} />
                <Route path="/result-page/:id" component={SearchResults} />
                <Route path="/edit-item/:id" component={EditItem} />
                <Route path="/mylist" component={MyList} />
                <Route path="/register" component={RegistrationPage} />
			</Switch>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
