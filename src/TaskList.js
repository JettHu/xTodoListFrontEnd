import React,{Component} from "react"

class TaskList extends Component{
    render(){
        const {tasks, removeTask, finishTask} = this.props;
        const lis = tasks && tasks.map((task, index)=>{
            return <TaskItem index={index} {...task} removeTask={removeTask} finishTask={finishTask}/>
        })

        return (
            <ul>{lis}</ul>
        )
    }
}


class TaskItem extends Component{
    
    render(){
        const {index, todo, done, removeTask, finishTask } = this.props;

        const doneClass = (done?"task-done":"task-defalut");
        return(
            <li>
                <input type="checkbox" checked={done} onChange={() => finishTask(index)}/>
                <span className={doneClass}>{todo}</span>
                <button onClick={() => removeTask(index)}>Delete</button>
            </li>
        )
    }

}

export default TaskList