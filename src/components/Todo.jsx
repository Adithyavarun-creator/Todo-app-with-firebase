import React, { useState } from 'react'
import { ListItem,List, Button,ListItemText, ListItemAvatar ,Modal} from '@material-ui/core'
import db from '../firebase'
import DeleteForever from '@material-ui/icons/DeleteForever'
import './Todo.css'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    paper:{
        position:'absolute',
        width:400,
        backgroundColor:theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow:theme.shadows[5],
        padding: theme.spacing(2,4,3),
    },
}))


const Todo = (props) => {
    const classes = useStyles()

    const [open,setOpen] = useState(false)
    const [input,setInput] = useState()

    const handleOpen = () => {
        setOpen(true)
    }

    const updateTodo = () =>{
        //update with new input text
        db.collection('todos')
        .doc(props.todo.id)
        .set({
            todo:input
        },{ merge: true})

        setOpen(false)
    }

    return (
        <>
        
        <Modal open={open}
        onClose={(e) => setOpen(false)}>
            
            <div className={classes.paper}>  
                <h1>I am a Modal</h1>
                <input value={input} onChange={(e) => setInput(e.target.value)}/>
                <Button onClick={updateTodo}>
                    Update Todo
                </Button>
            </div>    
        </Modal>

            <List className='todo-list'>
                <ListItem>
                    <ListItemAvatar>
                    </ListItemAvatar>
                    <ListItemText key={props.id} primary={props.todo.todo} secondary="Check your deadline" />
                </ListItem>
                <button onClick={(e) => setOpen(true)}>
                    Edit
                </button>
                <DeleteForever onClick={event => {db.collection('todos').doc(props.todo.id).delete()}} />
            </List>

            </>
    )
}

export default Todo
