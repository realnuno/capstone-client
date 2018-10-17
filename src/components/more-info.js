import React, { Component } from "react";
import { connect } from "react-redux";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Spinner from 'react-spinkit';
import { fetchMoreInfo, fetchPhotos, addList } from "../actions/fetch-data";
import HeaderBar from './header-bar';

class MoreDetail extends Component {

    constructor(props) {
        super(props);

        this.state = { term: "" };

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }


    componentDidMount() {
      	const { id } = this.props.match.params;
      	this.props.fetchMoreInfo(id);
      	this.props.fetchPhotos(id);
		window.scrollTo(0, 0)
    }


    onFormSubmit(event) {
        event.preventDefault();

        const item = {
            memo: this.textInput.value,
            detail: this.props.detail.detail.response.venue,
            photos: this.props.photos.photos.response.photos
        }

        this.props.addList(item);
        this.props.history.push("/mylist");
    }



    render() {


        if(!this.props.detail.detail || !this.props.photos.photos){
            return (
              <div>
                <HeaderBar />
                <div className="row spinnerParent">
                    <form onSubmit={this.onFormSubmit} id="detail-info-results" aria-live="assertive">
                        <div className="col-12">
                            <Spinner spinnername="circle" fadeIn='none' />
                        </div>
                    </form>
                </div>
              </div>
            )
        }
//        console.log(this.props.photos);


            const venueDetail = this.props.detail.detail.response.venue;
//            console.log(venueDetail);

            const detailVenueName = venueDetail.name;
            const detailCategory = venueDetail.categories[0].name;
            const detailAddress1 = venueDetail.location.formattedAddress[0];
            const detailAddress2 = venueDetail.location.formattedAddress[1];
            const detailAddress = `${detailAddress1}, ${detailAddress2}`;
            const lat = venueDetail.location.lat;
            const lng = venueDetail.location.lng;

            let detailPhoneNumber = "";
            let detailDescription = "";
            let detailWebsite = "";
            let detailPhoto1 = "";
            let detailPhoto2 = "";



//                console.log(inputData);
            if(venueDetail.contact.formattedPhone === undefined){
                detailPhoneNumber = "Sorry.. No Phone number is available"
            } else {
                detailPhoneNumber = venueDetail.contact.formattedPhone;
            };

            if(venueDetail.description === undefined){
                detailDescription = "Sorry.. No Description is available"
            } else {
                detailDescription = venueDetail.description;
            };

            if(venueDetail.url === undefined){
                detailWebsite = "Sorry.. No Website is available"
            } else {
                detailWebsite = venueDetail.url;
            };




            const venuePhotos = this.props.photos.photos.response.photos;

            if(venuePhotos.count === 0){
                detailPhoto1 = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
                detailPhoto2 = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
            }else if(this.props.photos.photos.response.photos.count === 1){
                const photo1Prefix = venuePhotos.items[0].prefix;
                const photo1Suffix = venuePhotos.items[0].suffix;
                const photo1Height = venuePhotos.items[0].height;
                const photo1Width = venuePhotos.items[0].width;
                detailPhoto1 = `${photo1Prefix}${photo1Height}${photo1Width}${photo1Suffix}`;
                detailPhoto2 = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
            }else {
                const photo1Prefix = venuePhotos.items[0].prefix;
                const photo1Suffix = venuePhotos.items[0].suffix;
                const photo1Height = venuePhotos.items[0].height;
                const photo1Width = venuePhotos.items[0].width;
                detailPhoto1 = `${photo1Prefix}${photo1Height}${photo1Width}${photo1Suffix}`;

                const photo2Prefix = venuePhotos.items[1].prefix;
                const photo2Suffix = venuePhotos.items[1].suffix;
                const photo2Height = venuePhotos.items[1].height;
                const photo2Width = venuePhotos.items[1].width;
                detailPhoto2 = `${photo2Prefix}${photo2Height}${photo2Width}${photo2Suffix}`;
            }

//    ================= GoogleMap ===============================

            const MapWithAMarker = withScriptjs(withGoogleMap(props =>
                <GoogleMap defaultZoom={14} defaultCenter={{ lat, lng }} >
                <Marker position={{ lat, lng }} />
                </GoogleMap>
            ));

//    ============================================================



        return (
          <div>
            <HeaderBar />
            <div className="row detail-info">
                <h2 id="venue-name">{detailVenueName}</h2>
                <form onSubmit={this.onFormSubmit} id="detail-info-results" aria-live="assertive">
                    <div className="col-6">
                        <div className="detail-photo-map-section">
                            <img src={detailPhoto1} alt={detailVenueName} height="400" width="400" />
                            <img src={detailPhoto2} alt={detailVenueName} height="400" width="400" />
                            <MapWithAMarker
                                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDE0B5I7RUPEjusRik4arRAAa8LQnA2c0s&v=3.exp&libraries=geometry,drawing,places"
                                  loadingElement={<div style={{ height: `100%` }} />}
                                  containerElement={<div style={{ height: `400px` }} />}
                                  mapElement={<div style={{ height: `100%` }} />}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="information-section">
                            <p className='result-category'>category : <span className='what-place'>{detailCategory}</span></p>
                            <p className='result-description'>description : {detailDescription}</p>
                            <p className='result-phone-number'>phone : {detailPhoneNumber}</p>
                            <p className='result-website'>website : {detailWebsite}</p>
                            <p className='result-address'>address : {detailAddress}</p>
                            <textarea
                                ref={input => this.textInput = input}
                                name='note'
                                rows="4" cols="50" className="note-textarea" placeholder="note.."></textarea>
                        </div>
                    </div>
                    <div className="col-12 detail-buttons">
                        <button type='submit' className='button add-item-button'>add</button>
                        <button onClick={this.props.history.goBack} className='button back-to-list-button'>back to list</button>
                    </div>
                </form>
            </div>
          </div>
        )

    }
}









//function mapStateToProps({ detail }, ownProps) {
//  return detail ;
//}

function mapStateToProps(state) {
  return {
      detail: state.detail,
      photos: state.photos
  };
}

export default connect(mapStateToProps, { fetchMoreInfo, fetchPhotos, addList })(MoreDetail);
