import {HTTP} from './config'; 

export const getStudiesDistribution = (stepId) => {
    return HTTP.get(`extraction/distribution/${stepId}`);
}

export const getSelectionDistribution = (stepId) => {
    return HTTP.get(`extraction/distribution/${stepId}/selection`);
}

export const createForm = (stepId, distribution) => {
    return HTTP.post(`extraction/distribution/${stepId}`, distribution);
}

export const getStudiesConflicts = (stepId) => {
    return HTTP.get(`extraction/distribution/${stepId}/conflict`);
}