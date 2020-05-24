import { getCurrentStep } from './../services/StepService';
import { receiveData, requestData } from './loading';

export const GET_STEP = 'GET_STEP';

function getExtractionStep(step) {
  return {
    type: GET_STEP,
    step: step
  };
}

export function handleGetStep(projectId) {
  return dispatch => {
    dispatch(requestData());
    return getCurrentStep(projectId)
      .then(res => {
        dispatch(receiveData());
        dispatch(getExtractionStep(res.data));
      })
      .catch(err => console.log('There was an error. Try again.' + err));
  };
}
