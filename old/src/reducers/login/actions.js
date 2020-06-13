export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = ({email, id}) => ({type: LOGIN, payload: {email, id}});
export const logout = () => ({type: LOGOUT});