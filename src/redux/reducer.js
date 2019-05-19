import * as Tasks
  from './types';
import { LOCATION_UNDEFINED } from '../constants';

const INITIAL_STATE = {
  tasks: [],
  selectedTaskId: undefined,
  editMode: false,
  address: undefined,
  location: LOCATION_UNDEFINED,
  date: undefined,
};

/*
const INITIAL_TASK = {
  id: undefined,
  type: [],
  location: undefined,
  description: '',
};
*/

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Tasks.NEW_TASK:
      return {
        ...state,
        editMode: true,
        selectedTaskId: undefined,
        address: undefined,
        location: LOCATION_UNDEFINED,
        date: undefined,
      };
    case Tasks.CREATE_TASK:
      return {
        ...state,
        editMode: false,
        tasks: state.tasks.concat(payload),
      };
    case Tasks.EDIT_TASK: {
      return {
        ...state,
        editMode: true,
        selectedTaskId: payload,
        address: undefined,
        location: undefined,
      }
    }
    case Tasks.UPDATE_TASK:
      console.log('update', payload);
      // edit selected task
      if (state.selectedTaskId) {
        return {
          ...state,
          editMode: false,
          tasks: state.tasks.map(t =>
            t._id === state.selectedTaskId ? payload : t
          )
        }
      }
      return state;
    case Tasks.DELETE_TASK:
      console.log('delete', payload);
      return {
        ...state,
        editMode: false,
        tasks: state.tasks.filter(({ _id }) => _id !== payload)
      };
    case Tasks.SET_ADDRESS_FROM_MAP:
      const { lat, lng, address } = payload;
      if (state.editMode) {
        return {
          ...state,
          address: address,
          location: {
            lat,
            lng
          },
        };
      } else {
        return {
          ...state,
        }
      }
    default:
      return state;
  }
};
