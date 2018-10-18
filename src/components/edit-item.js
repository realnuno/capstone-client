import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from 'react-spinkit';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { fetchToEdit, editMemoInList } from "../actions/fetch-data";
import {GOOGLE_MAP_API} from '../config';
import HeaderBar from './header-bar';

class EditItem extends Component {

    constructor(props) {
        super(props);

        this.clickControl = this.clickControl.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }


    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchToEdit(id);
    }


    onEditSubmit(event) {
        event.preventDefault();

        const editedMemo = this.textInput.value;
        const editId = this.props.match.params;

        const editInput = {
            memo: editedMemo,
            id: editId.id
        }

        this.props.editMemoInList(editInput);
        this.props.history.push("/mylist");
    }


    prevPage(event) {
//        event.preventDefault();
        event.stopPropagation();
        this.props.history.push("/mylist");
    }

    clickControl(e){
//        e.preventDefault();
        e.stopPropagation();
        return false
    }



    render() {


        if(!this.props.itemsToEdit){
            return (
              <div>
                <HeaderBar />
                <div className="row detail-info">
                    <Spinner spinnername="circle" fadeIn='none' />
                </div>
              </div>
            )
        }

        const itemsToEdit = this.props.itemsToEdit;
        const detailVenueName = itemsToEdit.venueName;
        const detailCategory = itemsToEdit.category;
        const detailAddress = itemsToEdit.address;
        const lat = Number(itemsToEdit.lat);
        const lng = Number(itemsToEdit.lng);
        const detailPhoneNumber = itemsToEdit.phoneNumber;
        const detailDescription = itemsToEdit.description;
        const detailWebsite = itemsToEdit.website;
        const detailPhoto1 = itemsToEdit.photo1;
        const detailPhoto2 = itemsToEdit.photo2;
        const memo = itemsToEdit.memo;





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
                <form onSubmit={this.onEditSubmit} id="detail-info-results" aria-live="assertive">
                    <div className="col-6">
                        <div className="detail-photo-map-section">
                            <img src={detailPhoto1} alt={detailVenueName} height="400" width="400" />
                            <img src={detailPhoto2} alt={detailVenueName} height="400" width="400" />
                            <MapWithAMarker
                                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API}&v=3.exp&libraries=geometry,drawing,places`}
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
                                defaultValue={memo}
                                ref={input => this.textInput = input}
                                name='note'
                                rows="4" cols="50" className="note-textarea" placeholder="note.."></textarea>
                        </div>
                    </div>
                    <div className="col-12 detail-buttons">
                        <button onClick={this.clickControl} type='submit' className='button add-item-button'>save</button>
                        <button onClick={this.prevPage} className='button back-to-list-button'>back to list</button>
                    </div>
                </form>
            </div>
          </div>
        )

    }
}


function mapStateToProps({ itemsToEdit }, ownProps) {
  return itemsToEdit ;
}

export default connect(mapStateToProps, { fetchToEdit, editMemoInList })(EditItem);
