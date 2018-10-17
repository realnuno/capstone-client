import React from 'react';
import {Link} from 'react-router-dom';
import HeaderBar from './header-bar';

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { term: "" };

        this.onInputChange = this.onInputChange.bind(this);
    }
	
	componentDidMount() {
        window.scrollTo(0, 0)
    };
	

    onInputChange(event) {
        this.setState({ term: event.target.value });
    }


    render() {

        return (
          <div>
            <HeaderBar />
            <div className="search-page">
                <form className="search-form">
                    <div className="title">
                        <h2>
                            Travelers
                        </h2>
                    </div>
                    <input
                        type="text"
                        className="search-input"
                        id="search-input"
                        name="search-input"
                        placeholder="city,venue..."
                        value={this.state.term}
                        onChange={this.onInputChange} />
                    <Link to={`/result-page/${this.state.term}`}>
                        <button id="search-button" className="button search-button">search</button>
                    </Link>
                </form>
            </div>
          </div>
        );
    }
}

