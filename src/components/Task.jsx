import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const TaskMarkButton = (props) => (
  <button type="button" className="btn btn-outline-success btn-sm" onClick={props.onClick}>
    Completar
  </button>
)

TaskMarkButton.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}


const TaskUnmarkButton = (props) => (
  <button type="button" className="btn btn-outline-warning btn-sm" onClick={props.onClick}>
    Sin completar
  </button>
)

TaskUnmarkButton.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export const TaskItem = (props) => {

  const { id, content, done } = props.item;
  const { setDone } = props;

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <p className="card-text">
              {content}
            </p>
          </div>
          <div className="col-auto">
            {done ? <TaskUnmarkButton onClick={() => setDone(id, false)} /> : <TaskMarkButton onClick={() => setDone(id, true)} />}
          </div>
        </div>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  item: PropTypes.object.isRequired,
  setDone: PropTypes.func.isRequired
}
