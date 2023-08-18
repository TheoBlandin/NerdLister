import React from 'react';
import './preset-items.css';

class PresetItems extends React.Component {
    render() {
        return (
            <button className="select-preset" onClick={this.props.onClick}>{this.props.name}</button>
        )
    }
}

export default PresetItems;