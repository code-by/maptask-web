import { TASK_SERVICES } from './constants';
import { taskDescription } from './utils';

export const getTaskById = (tasks, id) =>
  tasks.find(t => t._id === id);

export const taskTypeSelector = taskTypeId =>
  TASK_SERVICES.find(t => t._id === taskTypeId);

export const taskSubTypeSelector = (taskType, taskSubTypeId) =>
  taskType.types.find(s => s._id === taskSubTypeId);

export const selectTaskInformation = (taskIds) => {
  const taskType = taskTypeSelector(taskIds[0]);
  const taskSubType = taskSubTypeSelector(taskType, taskIds[1]);
  return taskDescription(taskType, taskSubType);
};
