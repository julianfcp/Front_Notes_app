import React, { Component } from 'react';
import axios from 'axios';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userSelected: '',
            title: '',
            content: '',
            date: new Date()
        }
    }

    async componentDidMount() {
        this.getUsers();

    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({ users: res.data });
        this.setState({ userSelected: res.data[0].username }); // Usuario default si no se escoge
    }

    onSubmit = async (e) => {
        e.preventDefault(); // evita reiniciar la pagina
        console.log("title: " + this.state.title + " content: " + this.state.content);
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected,
        }
        const res = await axios.post('http://localhost:4000/api/notes', newNote);
        console.log(res.data);
        // Clear form: 
        document.getElementById("create-note-form").reset();
        this.setState({ date: new Date() });
    }
    // Este evento maneja (userSelected, title, content)
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // Date picker devuelve un objeto tipo date
    onChangeDate = (date) => {
        this.setState({
            date: date
        })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create a Note</h4>
                    {/** SELECT USER */}
                    <form id="create-note-form" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <select
                                className="form-control"
                                name="userSelected"
                                onChange={this.onInputChange}>
                                {
                                    this.state.users.map(user =>
                                        <option
                                            className=""
                                            key={user._id}
                                            value={user.username}>
                                            {user.username}
                                        </option>)
                                }
                            </select>
                        </div>
                        {/** Note Title */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Title"
                                name="title"
                                onChange={this.onInputChange}
                                required />
                        </div>
                        {/** Note Content */}
                        <div className="form-group">
                            <textarea
                                name="content"
                                className="form-control"
                                placeholder="Content"
                                onChange={this.onInputChange}

                                required>
                            </textarea>
                        </div>
                        {/** Date Note */}
                        <div className="form-group">
                            <Datepicker
                                className="form-control"
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            >
                            </Datepicker>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
