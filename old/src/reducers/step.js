import { GET_STEP } from './../actions/step';

export default function researcher(state = {}, action) {
  switch (action.type) {
    case GET_STEP:
      return action.step;
    default:
      return state;
  }
}