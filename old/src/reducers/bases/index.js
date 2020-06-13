import {SET_BASES} from './actions';

export default (state= [], action ) => {
    switch (action.type) {
        case SET_BASES:
            return action.bases.bases.map(base => base);
        default:
            return state;
    }
}