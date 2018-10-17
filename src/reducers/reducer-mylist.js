import { SHOW_MYLIST } from '../actions/fetch-data';

const initialState = {
    mylist: null
};

export default function (state = initialState, action) {
    if (action.type === SHOW_MYLIST) {

        return Object.assign({}, state, {
            mylist: action.mylist
        });
    }


    return state;
}

