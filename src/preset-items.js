import React from 'react';
import './preset-items.css';

class PresetItems extends React.Component {
    render() {
        return (
            <button className="select-preset" aria-label={`Start ranking using the ${this.props.name.substring(2)} pre-set list`} onClick={this.props.onClick}>{this.props.name}</button>
        )
    }
}

export default PresetItems;