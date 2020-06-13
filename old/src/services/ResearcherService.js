import {HTTP} from './config'; 

export const getResearcherProject = (id) =>{
    return HTTP.get(`researcher/project/${id}`);
}

export const getResearcherByEmail = (email) =>{
    return HTTP.get(`researcher/${email}`);
}
