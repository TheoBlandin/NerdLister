import React from 'react';
import './rankItem.css';
import SmallItem from './smallItem';

class RankItem extends React.Component {
    render() {
        return (
            <div className="rank-item">
                <div className="rank">{this.props.rank}</div>
                <SmallItem icon={this.props.item.icon} />
                <div className="name-item">{this.props.item.name}</div>
            </div>
        );
    }
}

export default RankItem;