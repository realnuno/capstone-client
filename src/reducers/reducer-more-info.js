import { DETAIL_DATA } from '../actions/fetch-data';

const initialState = {
    detail: null
};

export default function (state = initialState, action) {
    if (action.type === DETAIL_DATA) {

        return Object.assign({}, state, {
            detail: action.detail
        });
    }


    return state;
}

