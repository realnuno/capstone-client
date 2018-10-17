import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import {GOOGLE_MAP_API} from '../config'

export default class ResultsItem extends Component {
    constructor(props) {
        super(props);

        this.clickControl = this.clickControl.bind(this);
    };

    clickControl(e){
//        e.preventDefault();
        e.stopPropagation();
        return false
    }

    render() {

        const venueName = this.props.venue.name;
        const category = this.props.venue.categories[0].name;
        const lat = this.props.venue.location.lat;
        const lng = this.props.venue.location.lng;
        const address1 = this.props.venue.location.formattedAddress[0];
        const address2 = this.props.venue.location.formattedAddress[1];
        const address = `${address1}, ${address2}`;
        const venueId = this.props.venue.id;


//================================= GoogleMap ==================
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap defaultZoom={14} defaultCenter={{ lat, lng }} >
            <Marker position={{ lat, lng }} />
            </GoogleMap>
        ));
//==============================================================


        return (
                <div className="inner-search-result" >
                    <p className="result-venue-name">{venueName}</p>
                    <p className="result-category">{category}</p>
                    <p className="result-address"> {address} </p>
                    <MapWithAMarker
                          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API}&v=3.exp&libraries=geometry,drawing,places`}
                          loadingElement={<div style={{ height: `100%` }} />}
                          containerElement={<div style={{ height: `400px` }} />}
                          mapElement={<div style={{ height: `100%` }} />}
                    />
                    <Link to={`/moreinfo/${venueId}`}>
                        <button onClick={this.clickControl.bind(this)} type="submit" className="button detailButton">more info</button>
                    </Link>
                </div>
        )

    }

}
