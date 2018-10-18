import {API_BASE_URL} from '../config';

export const COLLECTED_DATA = "COLLECTED_DATA";
export const collectedData = data => ({
    type: COLLECTED_DATA,
    fetchedData: data
})

export const DETAIL_DATA = "DETAIL_DATA";
export const detailData = data => ({
    type: DETAIL_DATA,
    detail: data
})

export const PHOTOS_DATA = "PHOTOS_DATA";
export const photosData = data => ({
    type: PHOTOS_DATA,
    photos: data
})

export const ADD_LIST = "ADD_LIST";
export const addListPost = data => ({
    type: ADD_LIST,
    bodyInput: data
})

export const SHOW_MYLIST = "SHOW_MYLIST";
export const showMyList = data => ({
    type: SHOW_MYLIST,
    mylist: data
})

export const EDIT_ITEM = "EDIT_ITEM";
export const editMemoItem = data => ({
    type: EDIT_ITEM,
    itemsToEdit: data
})





export const fetchData = city => (dispatch, getState) => {

    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/api/search?q=${encodeURIComponent(city)}`, {
            method: 'GET',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${authToken}`
            }
        })
        .then(res => res.json())
        .then(json => dispatch(collectedData(json)))
        .catch(err => err);
};




export const fetchMoreInfo = venueId => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/api/searchmore?venueId=${encodeURIComponent(venueId)}`, {
            method: 'GET',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${authToken}`
            }
        })
        .then(res => res.json())
        .then(json => dispatch(detailData(json)))
        .catch(err => err);
}



export const fetchPhotos = venueId => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/api/searchphotos?venueId=${encodeURIComponent(venueId)}`, {
            method: 'GET',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${authToken}`
            }
        })
        .then(res => res.json())
        .then(json => dispatch(photosData(json)))
        .catch(err => err);
}




export const addList = item => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    const venueDetail = item.detail;
    const detailVenueName = venueDetail.name;
    const detailCategory = venueDetail.categories[0].name;
    const detailAddress1 = venueDetail.location.formattedAddress[0];
    const detailAddress2 = venueDetail.location.formattedAddress[1];
    const detailAddress = `${detailAddress1}, ${detailAddress2}`;
    const lat = venueDetail.location.lat;
    const lng = venueDetail.location.lng;
    const venueId = venueDetail.id;

    let detailPhoneNumber = "";
    let detailDescription = "";
    let detailWebsite = "";
    let detailPhoto1 = "";
    let detailPhoto2 = "";

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




    const venuePhotos = item.photos;


    if(venuePhotos.count === 0){
        detailPhoto1 = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
        detailPhoto2 = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
        console.log(detailPhoto1)
    }else if(venuePhotos.count === 1){
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

    const inputBody = {
        memo: item.memo,
        venueName: detailVenueName,
        phoneNumber: detailPhoneNumber,
        category: detailCategory,
        description: detailDescription,
        website: detailWebsite,
        address: detailAddress,
        photo1: detailPhoto1,
        photo2: detailPhoto2,
        lat,
        lng,
        venueId
    }

//    console.log(JSON.stringify(inputBody));

    return fetch(`${API_BASE_URL}/api/mylist/add-item`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify(inputBody),
            })
        .then(res => res.json())
        .then(json => dispatch(addListPost(json)))
        .catch(err => err);
}



export const fetchMyList = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/api/mylist/get-user-list`, {
            method: 'GET',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${authToken}`
            }
        })
        .then(res => res.json())
        .then(json => dispatch(showMyList(json)))
        .catch(err => err);
}




export const editMemoInList = editedMemo => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/api/mylist/edit-memo/${encodeURIComponent(editedMemo.id)}`, {
        method: 'PUT',
        body: JSON.stringify(editedMemo),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    }).then(res => {
        return res;
    })
    .catch(err => err);
}




export const fetchToEdit = id => (dispatch, getState) => {

    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/api/mylist/${encodeURIComponent(id)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            }
        })
        .then(res => res.json())
        .then(json => dispatch(editMemoItem(json)))
}



export const deletePost = id => (dispatch, getState) => {
    console.log(id)

    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/api/mylist/${encodeURIComponent(id)}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            }
        })
        .catch(err => err);
}























