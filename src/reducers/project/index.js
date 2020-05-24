import {EDIT_PROJECT} from './actions';

export default (state= {}, action ) => {
    switch (action.type) {
        case EDIT_PROJECT:
            return {
                id: action.id
            }
        default:
            return state;
    }
}