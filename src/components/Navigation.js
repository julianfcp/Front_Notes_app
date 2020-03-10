import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aNotes: 'active',
            aCreateNote: '',
            aCreateUser: ''
        }
    }

    onClickLink = (e) => {
        switch (e.target.id) {
            case "aNotes": 
                this.setState({aNotes: 'active', aCreateNote: '', aCreateUser: ''})
                break;
            case "aCreateNote": 
                this.setState({aNotes: '', aCreateNote: 'active', aCreateUser: ''})
                break;
            case "aCreateUser": 
                this.setState({aNotes: '', aCreateNote: '', aCreateUser: 'active'})
                break;
            default:
                break;
        }
    }


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Notes App
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className={"nav-item "+this.state.aNotes}>
                                <Link id="aNotes" className="nav-link" to="/" onClick={this.onClickLink}>Notes</Link>
                            </li>
                            <li className={"nav-item "+this.state.aCreateNote}>
                                <Link id="aCreateNote" className="nav-link" to="/create" onClick={this.onClickLink}>Create Note</Link>
                            </li>
                            <li className={"nav-item "+this.state.aCreateUser}>
                                <Link id="aCreateUser" className="nav-link" to="/user" onClick={this.onClickLink}>Create User</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
