import React, { Component } from 'react';
import Table from './Table';
import NewTaskForm from './NewTaskForm';
import TaskDetail from './Detail';
// import TaskList from './TaskList';
import { Route, Link } from "react-router-dom";


const server_url = 'http://localhost:8000/tasks/';

function App() {
    return (
        <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/:id" component={TaskDetail} />
        </div>
    )
}

function Header() {
    return (
        
        <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">xTodoList</Link>
                </li>
            </ol>
        </nav>
    );
}

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: []
        };
    }

    render() {
        return (
            <div className="container container-fill">
                <Table tasks={this.state.tasks} removeTask={this.removeTask} finishTask={this.finishTask} />
                {/* <TaskList tasks={this.state.tasks} removeTask={this.removeTask} finishTask={this.finishTask} /> */}
                <NewTaskForm handleSubmit={this.handleSubmit} />
            </div>
        )
    };

    componentDidMount() {
        fetch(server_url)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    tasks: result,
                })
            })
            .catch(err => alert("无法连接到服务器" + err))
    }

    removeTask = index => {
        const { tasks } = this.state;

        // TODO DELETE
        let task_url = server_url + tasks[index]["id"] + "/";
        fetch(task_url, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
            },
        }).then(response => {
            if (response.status === 204) {
                // TODO 删除成功
                console.log("删除成功");
                tasks.splice(index, 1);
                this.setState({ tasks: tasks });
            }
        }).catch(err => console.error(err))


    }

    finishTask = index => {

        let { tasks } = this.state;
        tasks[index]["done"] = !tasks[index]["done"];

        // TODO PATCH
        let task_url = server_url + tasks[index]["id"] + "/";
        fetch(task_url, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({ done: tasks[index]["done"] }),
        }).then(response => {
            if (response.status === 200) {
                // TODO 修改成功
                console.log("修改成功")
                
            }
        }).catch(err => console.error(err))
        this.setState({ tasks: tasks });
    }

    handleSubmit = task => {

        // TODO POST
        fetch((server_url), {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(task),
        }).then(response => {
            if (response.status === 201) {
                // TODO 添加成功
                console.log("添加成功")
                return response.json();
            }
        }).then(result => {
            task = result;
            this.setState({ tasks: [...this.state.tasks, task] });
        }).catch(err => console.error(err))


    }
}
export default App