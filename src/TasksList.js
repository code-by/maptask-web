import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import Card, { CardActionButtons, CardPrimaryContent } from '@material/react-card';
import Button from '@material/react-button';

import '@material/react-button/dist/button.css';
import '@material/react-card/dist/card.css';

import TaskCard from './TaskCard';

import { NEW_TASK } from './redux/types';

import './App.css';

const TasksList = ({
  tasks,
  onNewTaskClick,
  editMode,
  selectedTaskId,
}) => (
  <div>
    <Card
      className="TasksList-NewTask-button"
    >
      <CardPrimaryContent
        className="TasksList-NewTask-content"
      >
        <Button
          style={{
            fontSize: 16
          }}
          onClick={onNewTaskClick}
          disabled={(editMode && !selectedTaskId)}
        >{'\u002b'} NEW TASK</Button>
      </CardPrimaryContent>
    </Card>
    {
      ((tasks && tasks.length > 0)) && (
        <div>
          {
            tasks.map(t => (
              <TaskCard
                task={t}
                key={t._id}
              />
            ))
          }
        </div>
      )
    }
  </div>
);


const mapStateToProps = state => ({
  tasks: state.tasks,
  editMode: state.editMode,
  selectedTaskId: state.selectedTaskId,
});

const mapDispatchToProps = (dispatch) => ({
  newTaskAction: () => dispatch({ type: NEW_TASK })
});


const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onNewTaskClick: ({ newTaskAction }) => () => {
      newTaskAction();
    }
  }),
);


export default enhancer(TasksList);
