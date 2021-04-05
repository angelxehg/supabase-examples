import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'

import './App.css';

const supabaseUrl = 'https://fbqcsbackkddeeoiphvu.supabase.co'
const supabaseKey = 'INSERT_API_KEY';
const supabase = createClient(supabaseUrl, supabaseKey)

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
    <div>
      <header>
        <h1>Supabase Examples</h1>
        <p>Hola mundo</p>
        <button onClick={fetchTasks}>Recargar</button>
      </header>
      <main>
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