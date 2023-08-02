import React from 'react';
import './addItem.css';
import './index.css';

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            icon: '',
            visibility: this.props.visibility,
        };
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value,
        });
    }

    getItem = () => {
        return { name: this.state.name, icon: this.state.icon };
    }

    addItem = () => {
        this.setState({
            visibility: !this.state.visibility,
        });
        this.props.addNewItem();
    }

    removeItem = () => {
        this.setState({
            visibility: !this.state.visibility,
        });
        this.props.deleteElement(this.props.index)
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.addItem();
        }
    }

    handleKeyDownDelete = (event) => {
        if (event.key === 'Enter') {
            this.removeItem();
        }
    }

    render() {
        return (
            this.state.visibility ?
                (<div className="card">
                    <div className="add-name">
                        <label htmlFor="name-input">Name</label><br />
                        <input type="text" id="name-input" placeholder="Name" onChange={this.handleNameChange}></input>
                    </div>
                    <div className="del-element" aria-label="Remove the last item" tabIndex="0" onKeyDown={this.handleKeyDownDelete} onClick={this.removeItem} style={{
                        visibility: this.props.index == this.props.lenght - 2 && this.props.lenght > 4 ? 'visible' : 'hidden'
                    }}>Delete <span className="del-icon"></span></div>
                </div>) :
                (<button className="add-card" tabIndex="0" aria-label="Add a new item" onClick={this.addItem} onKeyDown={this.handleKeyDown}> </button>)
        );
    }
}

export default AddItem;