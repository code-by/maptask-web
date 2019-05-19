import { createAction } from 'redux-actions';
import {
  CREATE_TASK,
  DELETE_TASK,
  EDIT_TASK,
  NEW_TASK,
  SET_ADDRESS_FROM_MAP,
  UPDATE_TASK
} from './types';

export const setMapAddress = createAction(SET_ADDRESS_FROM_MAP);

export const editTask = createAction(EDIT_TASK);
export const deleteTask = createAction(DELETE_TASK);

export const createTask = createAction(CREATE_TASK);
export const updateTask = createAction(UPDATE_TASK);

export const newTask = createAction(NEW_TASK);
