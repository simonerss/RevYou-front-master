import {LOGIN, LOGOUT} from './actions';

export default (state= {}, action ) => {
    switch (action.type) {
        case LOGIN:
            return {
                email: action.payload.email,
                id: action.payload.id
            }
        case LOGOUT:
            return {};
        default:
            return state;
    }
}