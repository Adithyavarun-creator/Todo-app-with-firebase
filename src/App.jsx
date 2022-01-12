import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';

import db from './firebase';
import firebase from "firebase/compat/app";
import Todo from './components/Todo'

const App = () => {

  //const [todos,setTodos] = useState([ static here
    // 'Take dogs out',
    // 'Take lions out',
    // 'Take cats out'
  //])
  //dyanmic here
  const [todos,setTodos] = useState([])
  const [input,setInput] = useState('')

  useEffect(()=>{
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      //console.log(snapshot.docs.map(doc => doc.data()))
      setTodos(snapshot.docs.map(doc=>({
        id:doc.id,
        todo: doc.data().todo
      })))
      })
      //doc => doc.data().todo and todo is field where is it stored
  },[])


  const addTodo = (event) => {
    //console.log('Iam clicked');
    event.preventDefault()

    db.collection('todos').add({
      todo:input, //field
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([
      ...todos,
      input
    ])
    setInput('')
  }


  return (
    <div className="App">
      <h1>My Todos for doing nothing</h1>
      
      <FormControl>
        <InputLabel>🐈 Write a Todo to perform Nothing</InputLabel>
        <Input value={input} onChange={(e)=>setInput(e.target.value)}/>
      </FormControl>

      <Button disabled={!input}
      type="submit" onClick={addTodo} 
      variant="contained" color="primary">
        Add todo
      </Button>

      <ul>
        {
          todos.map((todo)=>(
            <Todo key={todo.id} todo={todo} />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
