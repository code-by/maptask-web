import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  withHandlers,
  withStateHandlers,
  lifecycle
} from 'recompose';
import { connect } from 'react-redux';
import uuid from 'uuid';

import Drawer, { DrawerContent, DrawerHeader } from '@material/react-drawer/dist/index';
import Button from '@material/react-button/dist/index';
import { Chip, ChipSet } from '@material/react-chips/dist/index';
import IconButton from '@material/react-icon-button/dist/index';
import { Caption } from '@material/react-typography/dist/index';

import '@material/react-drawer/dist/drawer.css';
import '@material/react-button/dist/button.css';
import '@material/react-card/dist/card.css';
import '@material/react-icon-button/dist/icon-button.css';
import '@material/react-chips/dist/chips.css';

import { createTask, updateTask } from '../redux/actions';
import { getTaskById, taskTypeSelector } from '../selectors';
import { TASK_SERVICES } from '../constants';

import '../assets/styles/App.css';


const ID_UNDEFINED = { _id: undefined };

const INITIAL_STATE = {
  selectedTaskType: ID_UNDEFINED,
  selectedTaskSubType: ID_UNDEFINED,
  taskDescriptionText: '',
  mapAddress: undefined,
  mapLocation: { lng: undefined, lat: undefined },
  currentSelectedTaskId: undefined,
  taskDate: undefined,
};


const checkNewLocation = (nextProps, props) => {
	if ((
		nextProps.locationFromMap && props.mapLocation && nextProps.locationFromMap.lng && (
			nextProps.locationFromMap.lng !== props.mapLocation.lng ||
			nextProps.locationFromMap.lat !== props.mapLocation.lat
		)) || (
			nextProps.locationFromMap && !props.mapLocation
		)
	) {
		props.setAddress(nextProps.addressFromMap, nextProps.locationFromMap);
	}
};


const ButtonServiceType = ({
  title,
  image,
  onClick,
  selected,
}) => (
  <div
    className="TaskCreator-ButtonServiceType"
  >
    <IconButton
      className={`TaskCreator-ButtonServiceTypeIcon ${selected ? 'TaskCreator-ButtonServiceTypeIcon-selected' : ''}`}
      onClick={onClick}
    >
      <div
        className="TaskCreator-ButtonServiceTypeIcon-inner"
      >
      <img
        src={image}
        className="TaskCreator-ButtonServiceTypeIcon-image"
        alt=""
      />
      </div>
    </IconButton>
    <div
      style={{ marginTop: 5 }}
    >
      <span
        className="mdc-chip__text TaskCreator-ButtonServiceType-title"
      >
        {title}
      </span>
    </div>
  </div>
);


const SectionTitle = ({ title }) => (
  <div
    className="TaskCreator-SectionTitleBlock"
  >
    <Caption
      className="TaskCreator-SectionTitleText"
    >
      {title}
    </Caption>
  </div>
);


const SectionBlock = ({ title, children }) => (
  <div>
    <div
      className="TaskCreator-SectionsInnerBlock"
    >
      <SectionTitle
        title={title}
      />
      {children}
    </div>
    <div
      className="TaskCreator-SectionsDivider"
    />
  </div>
);


const TaskCreator = ({
  onCreateTaskClick,
  onTaskTypeClick,
  onTaskSubTypeClick,
  selectedTaskType,
  selectedTaskSubType,
  taskDescriptionText,
  onTaskDescriptionChange,
  mapAddress,
  selectedTaskId,
  editMode,
}) => (
  <Drawer
    open={editMode}
    dir="rtl"
    dismissible
    className="TaskCreator"
  >
    <div
      dir="ltr"
      className="TaskCreator-inner"
    >
      <DrawerHeader
        className="TaskCreator-header"
      >
        <SectionTitle
          title={selectedTaskId ? 'UPDATE TASK' : 'NEW TASK'}
        />
        {
          (selectedTaskType._id) && (
            <div>
              <span
                className="TaskCreator-TaskDescription-title"
              >
                {'I need '}
                <span
                  className="TaskCreator-TaskDescription-title-text"
                >
                  {`a ${selectedTaskType.title.toLowerCase()}`}
                </span>
                {
                  (selectedTaskSubType._id) && (
                    <span>
                      {' to '}
                      <span
                        className="TaskCreator-TaskDescription-title-text"
                      >
                        {`${selectedTaskSubType.title.toLowerCase()}`}{`${taskDescriptionText ? `, ${taskDescriptionText}` : ''}.`}
                      </span>
                    </span>
                  )
                }
              </span>
            </div>
          )
        }
        <div
          className="TaskCreator-Header-Address"
        >
          <span>{`My address is ${mapAddress || 'unknown'}`}</span>
        </div>
        <Button
          raised
          className="button-alternate TaskCreator-button"
          onClick={onCreateTaskClick}
          disabled={!selectedTaskSubType._id}
        >
          {selectedTaskId ? 'UPDATE TASK' : 'CREATE TASK'}
        </Button>
      </DrawerHeader>

      <DrawerContent
        className="TaskCreator-Content"
      >
        <SectionBlock
          title="LOCATION"
        >
          <span
            className="TaskCreator-Content-Address"
          >
            { mapAddress || 'unknown' }
          </span>
        </SectionBlock>
        <SectionBlock
          title="SERVICE TYPE"
        >
          {
            TASK_SERVICES.map(
              ({ _id, title, image }) => (
                <ButtonServiceType
                  onClick={() => onTaskTypeClick(_id)}
                  key={_id}
                  title={title}
                  image={image}
                  selected={(selectedTaskType._id === _id)}
                />
              )
            )
          }
        </SectionBlock>
        {
          (selectedTaskType._id) && (
            <SectionBlock
              title={`${selectedTaskType.title.toUpperCase()} TASKS`}
            >
              <ChipSet
                className="TaskCreator-ServiceTypeTasksSet"
              >
                {
                  selectedTaskType.types.map(({ _id, title }) => (
                    <Chip
                      key={_id}
                      label={title}
                      selected={(selectedTaskSubType._id === _id)}
                      className={`TaskCreator-ServiceTypeTask ${(selectedTaskSubType._id === _id) ? 'TaskCreator-ServiceTypeTaskSelected' : ''}`}
                      onClick={() => onTaskSubTypeClick(_id)}
                    />
                  ))
                }
              </ChipSet>
            </SectionBlock>
          )
        }
        {
          (selectedTaskSubType) && (
            <SectionBlock
              title="TASK DESCRIPTION"
            >
              <input
                type="text"
                className="TaskCreator-Address-input"
                value={taskDescriptionText}
                onChange={onTaskDescriptionChange}
              />
            </SectionBlock>
          )
        }
      </DrawerContent>
    </div>
  </Drawer>
);


TaskCreator.propTypes = {
  onTaskTypeClick: PropTypes.func,
};


const mapStateToProps = (state) => ({
  selectedTaskId: state.selectedTaskId,
  tasks: state.tasks,
  editMode: state.editMode,
  addressFromMap: state.address,
  locationFromMap: state.location,
});

const mapDispatchToProps = ({
  createTaskAction: createTask,
  updateTaskAction: updateTask,
});


const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(
    () => ({
      ...INITIAL_STATE
    }),
    {
      onTaskTypeClick: () => (selectedTaskTypeId) => {
        const selectedTaskType = taskTypeSelector(selectedTaskTypeId);
        return {
          selectedTaskType,
          selectedTaskSubType: ID_UNDEFINED,
        }
      },
      onTaskSubTypeClick: ({ selectedTaskType }) => (selectedTaskSubTypeId) => {
        const selectedTaskSubType = selectedTaskType.types.find(t =>
          t._id === selectedTaskSubTypeId
        );
        return {
          selectedTaskSubType
        }
      },
      onTaskDescriptionChange: () => (e) => ({
        taskDescriptionText: e.target.value
      }),
      setAddress: () => (mapAddress, mapLocation) => ({
        mapAddress,
        mapLocation
      }),
      editTask: () => ({ _id, type, description, address, location, date }) => {
        const taskType = TASK_SERVICES.find(s => s._id === type[0]);
        const taskSubType = taskType.types.find(s => s._id === type[1]);
        return {
          currentSelectedTaskId: _id,
          selectedTaskType: taskType,
          selectedTaskSubType: taskSubType,
          taskDescriptionText: description,
          mapAddress: address,
          mapLocation: location,
          taskDate: date,
        };
      },
      clearData: () => () => ({
        ...INITIAL_STATE
      })
    }
  ),
  withHandlers({
    onCreateTaskClick: ({
      createTaskAction,
      selectedTaskType,
      selectedTaskSubType,
      mapAddress,
      mapLocation,
      taskDescriptionText,
      currentSelectedTaskId,
      updateTaskAction,
    }) => () => {
      const taskData = {
        _id: currentSelectedTaskId || uuid.v1(),
        type: [selectedTaskType._id, selectedTaskSubType._id],
        address: mapAddress,
        location: mapLocation,
        description: taskDescriptionText,
        date: Date.now(),
      };
      if (currentSelectedTaskId === undefined) {
        createTaskAction(taskData);
      } else {
        updateTaskAction(taskData);
      }
    }
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (nextProps) {
        if (nextProps.selectedTaskId !== this.props.currentSelectedTaskId) {
          if (nextProps.selectedTaskId) {
						// edit existing task
						const selectedTask = getTaskById(this.props.tasks, nextProps.selectedTaskId);
						if (selectedTask && selectedTask._id) {
							this.props.editTask(selectedTask);
						}
          } else {
						// create new task
						this.props.clearData();
          }
        }
        checkNewLocation(nextProps, this.props);
      }
    }
  })
);


export default enhancer(TaskCreator);
