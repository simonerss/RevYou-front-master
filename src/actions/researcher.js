import { getResearcherByEmail } from '../services/ResearcherService';
import { receiveData, requestData } from './loading';

export const GET_RESEARCHER = 'GET_RESEARCHER';

function getResearcher(researcher) {
  return {
    type: GET_RESEARCHER,
    researcher: researcher
  };
}

export function handleGetResearcher(email) {
  return dispatch => {
    dispatch(requestData());
    return getResearcherByEmail(email)
      .then(res => {
        dispatch(receiveData());
        dispatch(getResearcher(res.data));
      })
      .catch((err) => console.log('There was an error. Try again.' + err))
  };
}
