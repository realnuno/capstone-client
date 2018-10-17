import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import authReducer from './reducers/auth';
import protectedDataReducer from './reducers/protected-data';
import fetchedDataReducer from './reducers/reducer-fetch-data';
import moreInfoReducer from './reducers/reducer-more-info';
import photosReducer from './reducers/reducer-photos';
import mylistReducer from './reducers/reducer-mylist';
import editItemReducer from './reducers/reducer-edit-item';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        protectedData: protectedDataReducer,
        fetchedData: fetchedDataReducer,
        detail: moreInfoReducer,
        photos: photosReducer,
        mylist: mylistReducer,
        itemsToEdit: editItemReducer
    }),
    applyMiddleware(thunk)
);


// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;
