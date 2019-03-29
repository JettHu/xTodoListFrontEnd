import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';



class TaskDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            todo: "",
            desc: "",
            done: false,
            expire: false,
            expire_date: undefined,
            priority: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
    }

    handleDayClick(day, { selected }) {
        if (selected) {
            this.setState({ expire_date: undefined });
            return;
        }
        this.setState({
            expire_date: day,
            expire: true,
        });
    }


    componentDidMount() {
        const id = this.props.match.params.id;
        const server_url = 'http://localhost:8000/tasks/';
        fetch(`${server_url}${id}/`)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    ...result,
                })
            })
            .catch(err => alert("无法连接到服务器" + err))
    }

    handleChange = event => {
        const target = event.target;
        const { name } = target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value,  // js内字典key无需带引号，若要使用变量的值则带上[]
        });
    }

    handleSubmit = () => {

        let task = this.state
        if (!task.expire)
            task.expire_date = null;
        task.priority = parseInt(task.priority);
        const server_url = 'http://localhost:8000/tasks/';
        fetch((`${server_url}${task.id}/`), {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(task),
        }).then(response => {
            if (response.status === 200) {
                // TODO 修改成功
                alert("修改成功");
            }
        }).catch(err => console.error(err))
    }

    render() {
        const { todo, done, desc, expire, expire_date, priority } = this.state;
        return (
            <div>
                <div className="form-group">
                    <label>Todo</label>
                    <input type="text" value={todo} name="todo" className="form-control" placeholder="任务不能为空" onChange={this.handleChange} />
                </div>
                <div className="form-group form-check">
                    <input className="form-check-input" name="done" type="checkbox" checked={done} onChange={this.handleChange} />
                    <label className="form-check-label">Done</label>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea value={desc} className="form-control" name="desc" rows="3" onChange={this.handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label>Priority</label>
                    <select type="text" className="custom-select mr-sm-2" value={priority} name="priority" onChange={this.handleChange}>
                        <option defaultValue value="0">Choose...</option>
                        <option value="1">!</option>
                        <option value="2">!!</option>
                        <option value="3">!!!</option>
                    </select>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" checked={expire} className="form-check-input" name="expire" onChange={this.handleChange} />
                    <label>Expire</label>
                </div>
                <div className="form-group">
                    {/* <input type="text" value={expire_date || ""} className="form-control" name="expire_date" onChange={this.handleChange} /> */}
                    <DayPicker onDayClick={this.handleDayClick} selectedDays={new Date(expire_date)} />
                </div>
                <button className="btn btn-info" onClick={this.handleSubmit}>修改</button>
            </div>
        )
    }
}


export default TaskDetail