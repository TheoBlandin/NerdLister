import React from 'react';
import './items.css';
import colors from './utils';

class SmallItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="small-item-icon" style={{
                color: colors[this.props.icon.color],
            }}>{this.props.icon.pattern}</div>
        );
    }
}

export default SmallItem;