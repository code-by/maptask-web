import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardActionButtons, CardPrimaryContent } from '@material/react-card';
import Button from '@material/react-button';

import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import { selectTaskInformation } from './selectors';
import { DELETE_TASK, EDIT_TASK } from './redux/types';

import { formatCardDate } from './utils';

import '@material/react-button/dist/button.css';
import '@material/react-card/dist/card.css';


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


const mapDispatchToProps = (dispatch) => ({
  editTask: (payload) => dispatch({ type: EDIT_TASK, payload}),
  deleteTask: (payload) => dispatch({ type: DELETE_TASK, payload}),
});


const enhancer = compose(
  connect(null, mapDispatchToProps),
  withHandlers({
    onTaskEditClick: ({ editTask, task }) => () => {
      editTask(task._id);
    },
    onTaskDeleteClick: ({ deleteTask, task }) => () => {
      deleteTask(task._id)
    },
  })
);


export default enhancer(TaskCard);
