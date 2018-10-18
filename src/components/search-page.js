import React from 'react';
import HeaderBar from './header-bar';

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { term: "" };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    };


    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    onSearchClick(e) {
        if(this.state.term) {
            this.props.history.push(`/result-page/${this.state.term}`);
        }
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
                        required="required"
                        placeholder="city,venue..."
                        value={this.state.term}
                        onChange={this.onInputChange} />
                        <button onClick={this.onSearchClick} id="search-button" className="button search-button">search</button>
                </form>
            </div>
          </div>
        );
    }
}

