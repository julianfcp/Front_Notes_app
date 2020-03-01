import React, { Component } from 'react'
import axios from 'axios';

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
        this.setState({notes: res.data});
        console.log(this.state.notes);
    }


    render() {
        return (
            <div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.notes.map(note =>
                            <li 
                                className="list-group-item list-group-item-action" 
                                key={note._id}>
                                {note.title}
                            </li>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
