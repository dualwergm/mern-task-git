import React, { Component } from 'react';

class App extends Component {
    
    constructor(){
        super();
        this.state = {
            _id: '',
            title: '',
            description: '',
            tasks: []
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.deleteTask = this.deleteTask.bind(this);
    }

    addTask(e){
        if(this.state._id){
            console.log("id::",this.state._id);
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify({title: this.state.title, description: this.state.description}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: "Actualizado"});
                this.setState({title: '', description: '', _id: ''});
                this.fetchTasks();
            })
        } else{
            console.log(this.state);
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify({title: this.state.title, description: this.state.description}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Task saved'});
                this.setState({title: '', description: '', _id: ''});
                this.fetchTasks();
            })
            .catch(err => console.log(err));
        }
        e.preventDefault();
    }
    
    componentDidMount(){
        this.fetchTasks();
    }

    fetchTasks(){
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            this.setState({tasks: data});
        });
    }

    editTask(id){
        const task = fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => this.setState({
            _id: data._id,
            title: data.title,
            description: data.description
        }));
    }

    deleteTask(id){
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            M.toast({html: 'Task deleted'});
            this.fetchTasks();
        });
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
           [name]: value
        });
    }

    render() {
        return(
            <div>
                {/*Navegación */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Mern Stack</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task title" value={this.state.title}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} value={this.state.description} placeholder="Task description" className="materialize-textarea"></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(t => {
                                            return (
                                                <tr key={t._id}>
                                                    <td>{t.title}</td>
                                                    <td>{t.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darker-4" style={{margin: '4px'}} onClick={() => {
                                                            this.editTask(t._id);
                                                        }}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn light-blue darker-4" onClick={() => {
                                                            this.deleteTask(t._id);
                                                        }}>
                                                        <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;