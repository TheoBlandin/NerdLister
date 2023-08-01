import React from 'react';
import './items.css';
import colors from './utils';

class MidItem extends React.Component {
    render() {
        return (
            <div className="mid-item-icon" style={{
                color: colors[this.props.icon.color],
            }}>{this.props.icon.pattern}</div>
        );
    }
}

export default MidItem;
