import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'

import './App.css';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
)

function App() {

  const [tasks, setTasks] = useState([]);

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
      <main className="mt-2">
        <h2>Mis tareas</h2>
        <ul>
          {tasks.map(task => <li key={task.id}>
            {task.content}
          </li>)}
        </ul>
      </main>
    </div>
  );
}

export default App;
