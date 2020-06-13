import { combineReducers } from 'redux';
import loading from './loading';
import project from './project';
import researcher from './researcher';
import login from './login';
import step from './step';
import bases from './bases';

export default combineReducers({
  login,
  project,
  bases,
  loading,
  researcher,
  step
})