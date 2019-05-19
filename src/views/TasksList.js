import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import Card, { CardPrimaryContent } from '@material/react-card/dist/index';
import Button from '@material/react-button/dist/index';

import '@material/react-button/dist/button.css';
import '@material/react-card/dist/card.css';

import TaskCard from './TaskCard';

import { newTask } from '../redux/actions';
import '../assets/styles/App.css';


const TasksList = ({
  tasks,
  onNewTaskClick,
  editMode,
  selectedTaskId,
}) => (
  <div
    className="TasksList"
  >
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


TasksList.propTypes = ({

});


const mapStateToProps = state => ({
  tasks: state.tasks,
  editMode: state.editMode,
  selectedTaskId: state.selectedTaskId,
});

const mapDispatchToProps = ({
  newTaskAction: newTask,
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
