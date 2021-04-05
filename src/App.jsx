import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { createClient } from '@supabase/supabase-js';
import PropTypes from 'prop-types';

import './App.css';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
)

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

const TaskItem = (props) => {

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

function App() {

  const [tasks, setTasks] = useState([]);

  const pendingTasks = () => tasks.filter(i => i.done === false);
  const completedTasks = () => tasks.filter(i => i.done === true);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
    if (error) {
      return console.error(error);
    }
    setTasks(data)
  }

  const setTaskDone = async (id, done = false) => {
    const { error } = await supabase
      .from('tasks')
      .update({ done: done })
      .eq('id', id)
    if (error) {
      return console.error(error);
    }
    await fetchTasks();
  }

  useEffect(() => {
    fetchTasks()
  }, [])


  return (
    <div className="container-sm pt-3 pb-3">
      <header>
        <Helmet title="Supabase Examples">
          <body className="bg-light" />
        </Helmet>
        <div className="row align-items-center">
          <div className="col">
            <h1>Supabase Examples</h1>
          </div>
          <div className="col-auto">
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={fetchTasks}>
                Recargar
              </button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="mt-2">
          <h2>Pendientes</h2>
          {pendingTasks().map(task => <TaskItem key={task.id} item={task} setDone={setTaskDone} />)}
        </div>
        <div className="mt-2">
          <h2>Completadas</h2>
          {completedTasks().map(task => <TaskItem key={task.id} item={task} setDone={setTaskDone} />)}
        </div>
      </main>
    </div>
  );
}

export default App;
