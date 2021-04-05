import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import PropTypes from 'prop-types';

import './App.css';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
)

const TaskItem = (props) => {

  const { content } = props.item;

  return (
    <div className="card">
      <div className="card-body">
        <p className="card-text">
          {content}
        </p>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  item: PropTypes.object.isRequired
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

  useEffect(() => {
    fetchTasks()
  }, [])


  return (
    <div className="container-sm pt-3 pb-3">
      <header>
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
          {pendingTasks().map(task => <TaskItem key={task.id} item={task} />)}
        </div>
        <div className="mt-2">
          <h2>Completadas</h2>
          {completedTasks().map(task => <TaskItem key={task.id} item={task} />)}
        </div>
      </main>
    </div>
  );
}

export default App;
