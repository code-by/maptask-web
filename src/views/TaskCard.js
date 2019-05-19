import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import Card, { CardActionButtons, CardPrimaryContent } from '@material/react-card/dist/index';
import Button from '@material/react-button/dist/index';

import '@material/react-button/dist/button.css';
import '@material/react-card/dist/card.css';

import { editTask, deleteTask } from '../redux/actions';
import { selectTaskInformation } from '../selectors';
import { formatCardDate } from '../utils';

import '../assets/styles/App.css';


const TaskCard = ({
  task,
  onTaskDeleteClick,
  onTaskEditClick,
}) => (
  <Card
    className="mdc-card TasksList-Task"
  >
    <CardPrimaryContent
      className="TasksList-Task-content"
    >
      <div className="TasksList-Task-date">
        { formatCardDate(task.date) }
      </div>
      <div className='TasksList-Task-description'>
        {
          (task && task.type) && (
            selectTaskInformation(task.type)
          )
        }
      </div>
    </CardPrimaryContent>
    <CardActionButtons
      className="TasksList-Task-actions-buttons"
    >
      <Button
        raised
        onClick={onTaskEditClick}
      >
        Edit
      </Button>
      <Button
        onClick={onTaskDeleteClick}
      >
        Delete
      </Button>
    </CardActionButtons>
  </Card>
);


TaskCard.propTypes = {
  onTaskEditClick: PropTypes.func.isRequired,
  onTaskDeleteClick: PropTypes.func.isRequired,
};


const mapDispatchToProps = ({
  editTaskAction: editTask,
  deleteTaskAction: deleteTask,
});


const enhancer = compose(
  connect(null, mapDispatchToProps),
  withHandlers({
    onTaskEditClick: ({ editTaskAction, task }) => () => {
      editTaskAction(task._id);
    },
    onTaskDeleteClick: ({ deleteTaskAction, task }) => () => {
      deleteTaskAction(task._id)
    },
  })
);


export default enhancer(TaskCard);
