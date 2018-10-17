import { COLLECTED_DATA } from '../actions/fetch-data';

const initialState = {
    fetchedData: null
};

export default function (state = initialState, action) {

    if (action.type === COLLECTED_DATA) {
        return Object.assign({}, state, {
            fetchedData: action.fetchedData
        });
    }
    return state;
}

