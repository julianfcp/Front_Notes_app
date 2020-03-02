import React, { Component } from 'react'
import axios from 'axios';
import { format } from 'timeago.js';

export default class NotesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
    }

    async componentDidMount() {
        this.getNotes();
    }


    getNotes = async () => {
        const res = await axios.get('http://localhost:4000/api/notes');
        this.setState({ notes: res.data });
        console.log(this.state.notes);
    }


    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note =>
                        <div className="col-md-4 p-2" key={note._id}>
                            <div className="card">
                                <h5 className="card-header">{note.title}</h5>
                                <div className="card-body">
                                    <p className="card-text">{note.content}</p>
                                    <p>{note.author}</p>
                                    <p>{format(note.date)}</p>
                                    <button></button>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        )
    }
}
