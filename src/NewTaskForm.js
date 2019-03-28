import React, { Component } from 'react'

class NewTaskForm extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            todo: '',
            done: false,
        };

        this.state = this.initialState;

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = event => {
        const target = event.target
        const { name } = target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value,  // js内字典key无需带引号，若要使用变量的值则带上[]
        });
    }

    handleEnter(event) {
        if (event.keyCode === 13) { // 回车
            let value = event.target.value;
            if (!value) return false;   // 内容为空不响应

            this.props.handleSubmit(this.state);
            this.setState(this.initialState);
        }
    }

    render() {
        const { todo } = this.state;

        return (
            <div>
                <input
                    className="form-control"
                    type="text"
                    name="todo"
                    value={todo}
                    placeholder="添加任务"
                    onChange={this.handleChange}
                    onKeyUp={this.handleEnter.bind(this)} />
                {/* <label>Done</label>
                <input
                    type="checkbox"
                    name="done"
                    checked={done}
                    onChange={this.handleChange} /> */}
            </div>
        )
    }
}

export default NewTaskForm