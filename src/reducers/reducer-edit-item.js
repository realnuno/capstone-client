import { EDIT_ITEM } from '../actions/fetch-data';

const initialState = {
    itemsToEdit: null
};

export default function (state = initialState, action) {

    if (action.type === EDIT_ITEM) {
        return Object.assign({}, state, {
            itemsToEdit: action.itemsToEdit
        });
    }
    return state;
}

