import React, { Component } from 'react'
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

export default class NotesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        this.getNotes();
    }


    getNotes = async () => {
        const res = await axios.get('http://localhost:4000/api/notes');
        this.setState({ notes: res.data });
        console.log(this.state.notes);
    }

    deleteNote = async (id) => {
        await axios.delete('http://localhost:4000/api/notes/' + id);
        this.getNotes();
    }


    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note =>
                        <div className="col-md-4 p-2" key={note._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{note.title}</h5>
                                    <Link className="btn btn-secondary" to={"/edit/" + note._id}>
                                        Edit
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{note.content}</p>                    
                                </div>
                                <div className="card-footer text-muted d-flex justify-content-between">
                                    <p>{note.author}</p>
                                    <p>{format(note.date)}</p>
                                    <button className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        )
    }
}
