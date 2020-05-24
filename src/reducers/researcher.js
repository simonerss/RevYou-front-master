import { GET_RESEARCHER } from './../actions/researcher';

export default function researcher(state = {}, action) {
  switch (action.type) {
    case GET_RESEARCHER:
      return action.researcher;
    default:
      return state;
  }
}
