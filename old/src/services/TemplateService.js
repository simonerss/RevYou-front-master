import {HTTP} from './config'; 

    export const getFields = (stepId) => {
      let url = `extraction/template/${stepId}`;
      return HTTP.get(url);
    }

    export const upSertField = (stepId, field) => {
      let url = `extraction/template/${stepId}`;
      return HTTP.post(url, field);
    }

    export const updatePosition = (stepId, fieldId, position) => {
      let url = `extraction/template/${stepId}/field/${fieldId}/position/${position}`;
      return HTTP.post(url);
    }

    export const deleteField = (stepId, fieldId) => {

      let url = `extraction/template/${stepId}/field/${fieldId}`;
      return HTTP.delete(url);
    }


