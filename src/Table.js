import React, { Component } from 'react'
import { Link } from "react-router-dom";


class TableHeader extends Component {
    render() {
        return (
            <thead className="w-100">
                <tr className="row mx-0 ">
                    <th scope="col-1"></th>
                    <th scope="col-8"></th>
                    <th scope="col-1"></th>
                    <th scope="col-2">隐藏已完成</th>
                </tr>
            </thead>
        )
    }
}

class TableBody extends Component {
    render() {
        const { tasks, removeTask, finishTask } = this.props;
        const rows = tasks && tasks.map((row, index) => {
            return (
                <tr key={index} className="row mx-0 ">
                    <td className="col-1"><input type="checkbox" checked={row.done} onChange={() => finishTask(index)} /></td>
                    <td className="col-8"><Link className={row.done ? "task-done" : "task-defalut"} to={row.id + "/"}>{row.todo}</Link></td>
                    <td className="col-1"><PrioritySpan priority={row.priority} /></td>
                    <td className="col-2">
                        <button onClick={() => removeTask(index)} className="btn btn-outline-danger btn-sm">Delete</button>
                    </td>
                </tr>
            )
        })
        return <tbody className="w-100">{rows}</tbody>
    }
}

class PrioritySpan extends Component {
    render() {
        const { priority } = this.props;
        switch (priority) {
            case 1:
                return <span className="text-secondary">!</span>
            case 2:
                return <span className="text-warning">!!</span>
            case 3:
                return <span className="text-danger">!!!</span>
            default:
                return <span></span>
        }
    }
}

class Table extends Component {
    render() {
        const { tasks, removeTask, finishTask } = this.props; // ES6 var obj={ a: 1, b: 2, c: 3 }; let {c,b} = obj; => c=3, b=2

        return (
            <table className="table table-hover table-fill ">
                {/* <TableHeader /> */}
                <TableBody tasks={tasks} removeTask={removeTask} finishTask={finishTask} />
            </table>
        )
    }
}


export default Table