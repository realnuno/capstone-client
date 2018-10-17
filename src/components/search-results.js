import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Spinner from 'react-spinkit';
import { fetchData } from "../actions/fetch-data";
import HeaderBar from './header-bar';
import ResultsItem from './results-item';



class SearchResults extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchData(id);
        window.scrollTo(0, 0)
    };


    render() {

        if(!this.props.fetchedData){
            return (
        <div>
            <HeaderBar />
            <div className="foursquare-search-result" >
                <h2 className="section-title">results</h2>
                <div id="search-results" aria-live="assertive">
                    <ul className="row">
                        <li>
                            <Spinner spinnername="circle" fadeIn='none' />
                        </li>
                    </ul>
                </div>
            </div>
          </div>
            )
        }

        const checkResult = this.props.fetchedData.response.groups;
        if(checkResult === undefined){
            return (
        <div>
            <HeaderBar />
            <div className="foursquare-search-no-result" >
                <h2 className="section-title">results</h2>
                <div id="search-results" aria-live="assertive">
                    <ul className="row">
                        <li>
                            <p class="sorry-message">Sorry, There is no result. Search again, please.</p>
                    <Link to="/">
                        <button className="button re-search-button">search again</button>
                    </ Link>
                        </li>
                    </ul>
                </div>
            </div>
          </div>
            )
        }

        const results = this.props.fetchedData.response.groups[0].items;
        const displayResult = results.map((item, index) => {
            return(
                <li className="col-6" key={index}>
                    <ResultsItem {...item} />
                </li>
            )
        });

        return (
          <div>
            <HeaderBar />
            <div className="foursquare-search-result" >
                <h2 className="section-title">results</h2>
                <div id="search-results" aria-live="assertive">
                    <ul className="row">
                        {displayResult}
                    </ul>
                </div>
                <div className="no-result-text">

                </div>
            </div>
          </div>
        );
    }
}




function mapStateToProps({ fetchedData }, ownProps) {
  return fetchedData ;
}

export default connect(mapStateToProps, { fetchData  })(SearchResults);

