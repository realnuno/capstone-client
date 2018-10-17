import { PHOTOS_DATA } from '../actions/fetch-data';

const initialState = {
    photos: null
};

export default function (state = initialState, action) {
    if (action.type === PHOTOS_DATA) {

        return Object.assign({}, state, {
            photos: action.photos
        });
    }


    return state;
}

