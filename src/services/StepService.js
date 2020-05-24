import { HTTP } from './config';

export const getStep = stepId => {
  return HTTP.get(`extraction/step/${stepId}`);
};

export const getCurrentStep = projectId => {
  return HTTP.get(`extraction/step/${projectId}/current`);
};

export const getFinishedSteps = projectId => {
  return HTTP.get(`extraction/step/${projectId}`);
};

export const editStep = (stepId, step) => {
  return HTTP.put(`extraction/step/${stepId}`, step);
};

export const createStep = (projectId, step) => {
  return HTTP.post(`extraction/step/${projectId}`, step);
};
