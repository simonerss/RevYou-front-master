import {HTTP} from './config'; 

export const updateCreateAnswer = (answers, fieldId, formId) => {
    return HTTP.post(`extraction/form/${formId}/field/${fieldId}`, answers);
}

export const getFieldsWithAnswers = (formId) => {
    return HTTP.get(`extraction/form/${formId}`)
}

export const getStudyFieldsWithAnswers = (formId) => {
    return HTTP.get(`extraction/form/${formId}/study`)
}

export const getStepReport = (stepId, type) => {
    return HTTP.get(`extraction/form/${stepId}/report/${type}`)
}

export const getForms = (step) => {
    return HTTP.post(`extraction/form`, step)
}