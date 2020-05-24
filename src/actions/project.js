import {getResearcherProject} from './../services/ResearcherService'
import { receiveData, requestData } from './loading';

export const GET_PROJECT = 'GET_PROJECT'

function getProject (project) {
  return {
    type: GET_PROJECT,
    project: project
  }
}

export function handleGetProject (researcherId) {
  return (dispatch) => {
    dispatch(requestData());
    return getResearcherProject(researcherId)
      .then((res) => {
        dispatch(receiveData());
        dispatch(getProject(res.data));
      })
      .catch((err) => console.log('There was an error. Try again.' + err))
  }
}

