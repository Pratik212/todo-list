import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ListScreen from "./screens/ListScreen";
import FocusScreen from "./screens/FocusScreen";
import {Task} from "./types";
import { Link } from 'react-router-dom';
import { shuffle } from 'lodash';
import {nanoid} from "nanoid";

function App() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [focusedTaskId, setFocusedTaskId] = useState<string | undefined>(undefined)

    const updateTaskCompletion = (taskId: string, isComplete: boolean) => {
        setTasks(tasks => tasks.map(task =>{
            if (task.id === taskId) return {...task, isComplete}
            return task
        }))
    }

    const addTask = (task: Pick<Task, 'label'>) => {
        const id = nanoid();

        setTasks((tasks) => [
            ...tasks,
                {id, label: task.label, isComplete: false}
        ])

        if (!focusedTaskId) setFocusedTaskId(id)
    }

    const focusedTask = tasks.find((task) => task.id === focusedTaskId)

    const shuffleFocusedTask = () => {
        setFocusedTaskId(
           shuffle(tasks.filter(task => !task.isComplete))[0]?.id
        )
    }

    const tasksApi = {
        addTask,
        focusedTask,
        tasks,
        setTasks,
        shuffleFocusedTask,
        updateTaskCompletion
    }

    return (
      <Router>
          <nav>
              <Link  to="/" style={{fontWeight: 'bold'}}>List</Link>
              <Link to="/focus">Focus</Link>
          </nav>
          <Routes>
              <Route  path="/" element={<ListScreen {...tasksApi}/>} />
              <Route  path="/focus" element={<FocusScreen  {...tasksApi}/>} />
          </Routes>
      </Router>
  );
}

export default App;
